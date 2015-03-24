import logging
import base64
import hmac
import hashlib
import datetime
import json
import uuid

from google.appengine.api import search, taskqueue
from google.appengine.ext import ndb

from config import config
from boilerplate.models import User
from handlers.event import EventQueue
from models.models import Invite, Contact, ContactInvite, Comment
from managers.invite import InviteMapper


def get_voiceflows_headers():
    now = datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:00 GMT")
    secret = '8\x0c7_\x01\t/{C)6V`\x1c!'
    dig = hmac.new(secret, msg=now, digestmod=hashlib.sha256).digest()
    authToken = "Voiceflows " + base64.b64encode(dig).decode()

    return  {
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        'Date': now,
        'Authorization': authToken
    }


class InviteModel(object):
    invite_index = 'invite_index'

    def __init__(self, invite, user=None):
        self.user = user
        self.invite = invite

    def __getattr__(self, name):
        """
        Every property that doesnt match this class properties,
        will be delegated into the Entity
        Remember _getattr_ will be invoked
        after usual checking of attributes in the object
        """
        return getattr(self.invite, name)

    def get_contacts(self):
        return Invite.get_contacts_by_invite_id(
            self.invite.unique_id
        )

    def get_contact_invites(self):
        return Invite.get_contact_invites_by_invite_id(
            self.invite.unique_id
        )

    def put(self):
        """Creates/Updates an invite"""
        if self.user:
            self.invite.user = self.user.key

        if self.invite.unique_id is None:
            self.invite.unique_id = str(uuid.uuid4()).replace('-', '')

        self.invite.put()

        #Finally we index the Document
        self._index_document(self.invite)

        logging.info(self.invite.unique_id)
        return self.invite.unique_id

    def add_contacts(self, contacts):
        """Creates/Updates contacts in database"""
        puts = []
        contact_invite_puts = []
        for contact in contacts:
            if contact.unique_id is None:
                contact.unique_id = str(uuid.uuid4()).replace('-', '')

            puts.append(contact)
            contact_invite_puts.append(
                ContactInvite(
                    invite_id=self.invite.unique_id,
                    contact_id=contact.unique_id
                )
            )
        ndb.put_multi(puts)
        ndb.put_multi(contact_invite_puts)

    def send_async(self):
        """Push the invite send to the async queue"""
        EventQueue.push_event(
            endpoint=config.get('api_url'),
            headers=get_voiceflows_headers(),
            payload=InviteMapper.invite_to_dict(self)
        )

    def invite_contacts_async(self, contacts):
        """Push the contact notification send to the async queue"""
        body = {
            'invite_id': self.unique_id,
            'uniquecall_id': str(uuid.uuid4()).replace('-', ''),
            'email_template': {
                'url': self.invite.email_template,
                'subject': "You have been invited to {title}"
            }
        }
        body.update(InviteMapper.contacts_to_dict(contacts))

        EventQueue.push_event(
            endpoint=config.get('api_url') + "/contacts",
            headers=get_voiceflows_headers(),
            payload=body
        )

    def _index_document(self, invite):
        """
        Stores the document in the datastore index
        Search can only be performed word by word
        """
        index = search.Index(name=self.invite_index)
        inviteSearch = search.Document(
            doc_id=invite.unique_id,
            fields=[
                search.TextField(name='title', value=invite.title),
                search.DateField(name='start', value=invite.start),
            ],
            language='en'
        )
        index.put(inviteSearch)

    def add_comment(self, author, text):
        """Add a comment to the invite"""
        invite = self.invite

        if invite.comments is None:
            invite.comment = []

        comment = Comment()
        comment.author = author
        comment.comment = text
        comment.commentedOn = datetime.datetime.now()
        invite.comments.append(comment)
        invite.put()

#
# class InviteService(object):
#
#     def __init__(self, user=None):
#         self.user = user
#
#     def send_to_list_async(self, invite_id, contacts, extra_data={}):
#         """Enqueue the invite creation"""
#         EventDispatcher.push_event(
#             endpoint='/api/invite/send_to_list',
#             data={
#                 'unique_id': invite_id,
#                 'contacts': contacts,
#                 'extra_data': json.dumps(extra_data)
#             }
#         )
#
#     def get_by_user_id(self, user_id):
#         """Search all the invites by user_id"""
#         user = User.get_by_id(long(user_id))
#         invites = Invite.query(
#             Invite.user == user.key
#         ).fetch() or []
#         return [self._build(x) for x in invites]
#
#     def search(self, user_id, term=None):
#         """Search all the invites with the given term in the title"""
#
#         if term is None:
#             return self.get_by_user_id(user_id)
#
#         user = User.get_by_id(long(user_id))
#         if user is None:
#             raise Exception("Please provide a valid user")
#
#         index = search.Index(name=self.invite_index)
#         invite_query = index.search(term)
#         invite_ids = [x.doc_id for x in invite_query]
#
#         if not invite_ids:
#             return []
#
#         invites = Invite.query(
#             ndb.AND(
#                 Invite.unique_id.IN(invite_ids),
#                 Invite.user == user.key
#             )
#         ).fetch() or []
#
#         return [self._build(x) for x in invites]
#
#     def accept(self, invite_id, contact_id, channel, response):
#         contact_invite = ContactInvite.query(
#             ndb.AND(
#                 ContactInvite.invite_id == invite_id,
#                 ContactInvite.contact_id == contact_id
#             )
#         ).get()
#
#         if contact_invite is None:
#             raise Exception('No contact was found with the following id: ' + contact_id)
#
#         if channel == 'sms':
#             contact_invite.sms_response = response
#         elif channel == 'voice':
#             contact_invite.voice_response = response
#         elif channel == 'email':
#             contact_invite.email_response = response
#
#         contact_invite.put()
#
#     def get_comments(self, id):
#         invite = Invite.query(Invite.unique_id == id).get()
#         return {
#             'comments': [{
#                 'author': c.author,
#                 'comment': c.comment,
#                 'on': c.commentedOn.strftime("%Y-%m-%d %H:%M")
#             } for c in invite.comments]
#         }
#