__author__ = 'javi830810'
import datetime
import json
import uuid

from google.appengine.api import search, taskqueue
from google.appengine.ext import ndb

from models.models import Invite, Contact, ContactInvite, Comment
from boilerplate.models import User

class InviteMapper(object):
    def get_from_id(self, unique_id):
        """Get the invite by id"""
        invite = Invite.query(Invite.unique_id == unique_id).get()
        if invite is None:
            raise Exception('Invite not found with id: ' + unique_id)
        return self._build(invite)

    @classmethod
    def get_from_dict(cls, data_dict):
        """
        Creates an InviteModel out of the supplied dictionary
        This is a valid data-format:
        {
            'contacts': [
                {
                    'phone': '',
                    'email': 'javi@javi.com',
                    'name': u''
                }
            ],
            'EmailTemplate':{
                'Url': self.host_url + "/template/default_invite_template.html"
            },
            'start': '2014-10-06 04:01AM',
            'end': '2014-10-06 04:01AM',
            'where': 'Location',
            'title': 'Candle',
            'sharing_options':{
                'facebook':True,
            }
            'user_id': u'5302669702856704' #Not mandatory, could be anonymous
        }
        """
        invite = Invite()
        invite.unique_id = data_dict.get('unique_id', None)
        invite.title = data_dict.get('title', None)
        invite.description = data_dict.get('description', None)
        invite.where = data_dict.get('where', None)
        invite.shared_on_facebook = self.sharing_options(invite_dict)

        #12/09/2014 12:00 AM
        invite.start = datetime.datetime.strptime(data_dict['start'], "%m/%d/%Y %H:%M %p")
        if start < datetime.datetime.now():
                raise Exception("Start date cannot be in the past")
        if data_dict.get('end', None):
            end = datetime.datetime.strptime(data_dict['end'], "%m/%d/%Y %H:%M %p")
            if end < start:
                raise Exception("End date cannot be lower than Start Date")
            invite.end = end

        return invite

    @classmethod
    def get_contacts_list_from_dict(cls, contact_list):
        result = []
        for x in contact_list:
            contact = Contact()
            contact.unique_id = x.get('unique_id')
            contact.name = x.get('name')
            contact.phone = x.get('phone')
            contact.email = x.get('email')
            result.append(contact)
        return result


class InviteModel(object):
    invite_index = 'invite_index'

    def __init__(self, invite, contacts=[], user=None):
        self.user = user
        self.invite = invite
        self.contacts = contacts

    def put(self):
        """Creates/Updates an invite"""
        if self.user:
            self.invite.user = self.user.key
        self.invite.put()

        self.put_contacts()

        #Finally we index the Document
        self._index_document(self.invite)

    def put_contacts(self):
        puts = []
        contact_invite_puts = []
        for contact in self.contacts:
            puts.append(contact)
            contact_invite_puts.append(
                ContactInvite(
                    invite_id=invite.unique_id,
                    contact_id=contact.unique_id
                )
            )
        ndb.put_multi(puts)
        ndb.put_multi(contact_invite_puts)

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


class InviteService(object):

    def send_to_all_async(self, invite_id, extra_data={}):
        """Enqueue the invite creation"""
        taskqueue.add(
            url='/api/invite/send_to_all',
            headers={
                'Date':'test'
            },
            params={
                'unique_id': invite_id,
                'extra_data': json.dumps(extra_data)
            }
        )

    def send_to_list_async(self, invite_id, contacts, extra_data={}):
        """Enqueue the invite creation"""
        taskqueue.add(
            url='/api/invite/send_to_list',
            headers={
                'Date':'test'
            },
            params={
                'unique_id': invite_id,
                'contacts': contacts,
                'extra_data': json.dumps(extra_data)
            }
        )



    def get_by_user_id(self, user_id):
        """Search all the invites by user_id"""
        user = User.get_by_id(long(user_id))
        invites = Invite.query(
            Invite.user == user.key
        ).fetch() or []
        return [self._build(x) for x in invites]

    def search(self, user_id, term=None):
        """Search all the invites with the given term in the title"""

        if term is None:
            return self.get_by_user_id(user_id)

        user = User.get_by_id(long(user_id))
        if user is None:
            raise Exception("Please provide a valid user")

        index = search.Index(name=self.invite_index)
        invite_query = index.search(term)
        invite_ids = [x.doc_id for x in invite_query]

        if not invite_ids:
            return []

        invites = Invite.query(
            ndb.AND(
                Invite.unique_id.IN(invite_ids),
                Invite.user == user.key
            )
        ).fetch() or []

        return [self._build(x) for x in invites]

    def accept(self, invite_id, contact_id, channel, response):
        contact_invite = ContactInvite.query(
            ndb.AND(
                ContactInvite.invite_id == invite_id,
                ContactInvite.contact_id == contact_id
            )
        ).get()

        if contact_invite is None:
            raise Exception('No contact was found with the following id: ' + contact_id)

        if channel == 'sms':
            contact_invite.sms_response = response
        elif channel == 'voice':
            contact_invite.voice_response = response
        elif channel == 'email':
            contact_invite.email_response = response

        contact_invite.put()

    def add_comment(self, id, author, commentText):
        """Get the invite by id"""
        invite = Invite.query(Invite.unique_id == id).get()
        if invite is None:
            raise Exception('Invite not found with id: ' + id)

        if invite.comments is None:
            invite.comment = []

        comment = Comment()
        comment.author = author
        comment.comment = commentText
        comment.commentedOn = datetime.datetime.now()
        invite.comments.append(comment)
        invite.put()

    def get_comments(self, id):
        invite = Invite.query(Invite.unique_id == id).get()
        return {
            'comments': [{
                'author': c.author,
                'comment': c.comment,
                'on': c.commentedOn.strftime("%Y-%m-%d %H:%M")
            } for c in invite.comments]
        }

    def _build(self, invite=None):
        if invite is None:
            invite = self.invite

        #contacts
        contacts_invites = {x.contact_id:x for x in ContactInvite.query(ContactInvite.invite_id == invite.unique_id).fetch()}

        contacts = []
        if contacts_invites:
            contacts = Contact.query(Contact.unique_id.IN(contacts_invites.keys())).fetch()
        return self._to_dict(invite, contacts_invites, contacts)

    def _to_dict(self, invite, contacts_invites, contacts):

        if invite.comments is None:
            invite.comments = []

        initial = {
            'unique_id':    invite.unique_id,
            'title':        invite.title,
            'start':        invite.start.strftime("%Y-%m-%d %H:%M"),
            'end':          invite.end.strftime("%Y-%m-%d %H:%M") if invite.end is not None else '',
            'description':  invite.description,
            'where':        invite.where,
            'contacts':     [{
                'unique_id': x.unique_id,
                'name':     x.name,
                'phone':    x.phone,
                'email':   x.email,
                'sms_response': contacts_invites[x.unique_id].sms_response,
                'voice_response': contacts_invites[x.unique_id].voice_response,
                'email_response': contacts_invites[x.unique_id].email_response,
            } for x in contacts],
            'comments':     [{
                'author':   c.author,
                'comment':  c.comment,
                'on':       c.commentedOn.strftime("%Y-%m-%d %H:%M")
            } for c in invite.comments]
        }

        return initial

    def sharing_options(self, invite_dict):
        if not invite_dict.get('facebook_share', None) or not self.user:
            return None
        sharing_options = {}
        social_provider_tokens = self.user.get_social_providers_tokens()

        if social_provider_tokens.get('facebook', None):
            sharing_options['FacebookAccessToken'] = social_provider_tokens['facebook']

        return sharing_options