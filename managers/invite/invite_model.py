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
from managers.event import EventQueue
from managers.utils import guid
from models import Invite, Contact, InviteAttendee, InviteAttendeeNotification, Comment, Image
from managers.invite import InviteMapper, CommentMapper
from managers.contact_model import ContactModel
from managers.base_model import BaseModel

def get_voiceflows_headers():
    now = datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:00 GMT")
    secret = '8\x0c7_\x01\t/{C)6V`\x1c!'
    dig = hmac.new(secret, msg=now, digestmod=hashlib.sha256).digest()
    authToken = "Voiceflows " + base64.b64encode(dig).decode()

    return {
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        'Date': now,
        'Authorization': authToken
    }


class InviteUserRole:
    ORGANIZER = 'organizer'
    ATTENDEE = 'attendee'
    UNKNOWN = 'unknown'


class InviteModel(BaseModel):
    invite_index = 'invite_index'

    def __init__(self, invite, user=None):
        super(InviteModel, self).__init__(invite)

        self.user = user
        self.invite = invite

        if self.user is None and self.invite.user is not None:
            self.user = self.invite.user.get()

    def copy_over(self, new_invite):
        if self.user is not None:
            self.invite.user = self.user.key

        super(InviteModel, self).copy_over(new_invite)

    def get_contacts(self):
        return Invite.get_contacts_by_invite_id(
            self.unique_id
        )

    def get_contact_invites(self):
        return Invite.get_contact_invites_by_invite_id(
            self.unique_id
        )

    def get_user_role_by_id(self, id):
        """
            Implement logic here
            on how to obtain roles per user on the invitation
        """
        return InviteUserRole.ORGANIZER

    def get_user_role_by_contact_channel(self, contact_channel):
        if self.user.email == email:
            return InviteUserRole.ORGANIZER

        for contact in self.get_contacts():
            if contact.email == contact_channel or contact.phone == contact_channel:
                return InviteUserRole.ATTENDEE

        return InviteUserRole.UNKNOWN

    def put(self):
        """Creates/Updates an invite"""
        if self.user:
            self.invite.user = self.user.key

        if self.invite.unique_id is None:
            self.invite.unique_id = guid()

        self.invite.put()

        #Finally we index the Document
        self._index_document(self.invite)

        return self.invite.unique_id

    def send_async(self):
        """Push the invite send to the async queue"""
        EventQueue.push_event(
            endpoint=config.get('api_url'),
            headers=get_voiceflows_headers(),
            payload=InviteMapper.invite_to_dict(self)
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

    def get_comments(self):
        return CommentMapper.comments_to_dict(self.invite.comments)

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

    def change_poster_picture(self, image_key):
        image = Image()
        image.unique_id = guid()
        image.image_key = image_key
        image.put()

        invite = self.invite
        invite.poster_picture = image.key
        invite.put()

    def accept(self, invite_contact_id, channel):
        self._mark_response(invite_contact_id, channel, 'YES')

    def deny(self, invite_contact_id, channel):
        self._mark_response(invite_contact_id, channel, 'NO')

    def _mark_response(self, invite_contact_id, channel, response):
        """Will update the contact RSVP"""
        contact_invite = ContactInvite.query(
            ContactInvite.unique_id == invite_contact_id
        ).get()

        if contact_invite is None:
            raise Exception('No contact was found with the following id: ' + contact_id)

        if channel == 'sms':
            contact_invite.sms_response = response
            contact_invite.sms_response_datetime = datetime.datetime.now()
        elif channel == 'voice':
            contact_invite.voice_response = response
            contact_invite.voice_response_datetime = datetime.datetime.now()
        elif channel == 'email':
            contact_invite.email_response = response
            contact_invite.email_response_datetime = datetime.datetime.now()

        contact_invite.put()

    @classmethod
    def create_from_id(cls, invite_id):
        invite_entity = Invite.get_by_unique_id(invite_id)

        if invite_entity is None:
            raise Exception("Invite not found with id: %s" % invite_id)

        return InviteModel(invite_entity)