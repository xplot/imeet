import logging

import json
import requests
import hmac
import hashlib
import base64

from datetime import datetime
from base import JsonHandler
from config import config
from google.appengine.api import search
from google.appengine.ext import ndb
from managers.template import TemplateModel
from managers.auth import user_context, request_with_subscription
from managers.invite import InviteMapper, InviteModel
from models import Invite
from boilerplate.models import  User

class InviteHandler(JsonHandler):

    @user_context
    def save(self):
        """Save the invite"""
        invite_dict = self._data()

        #Mapping
        invite_entity = InviteMapper.get_from_dict(invite_dict)

        logging.info(invite_entity)

        invite_model = InviteModel(invite_entity, user=self.user)
        invite_id = invite_model.put()

        return invite_id

    @user_context
    @request_with_subscription
    def send(self):
        """Send the invite out"""
        invite_dict = self._data()

        #Mapping
        invite_entity = InviteMapper.get_from_dict(invite_dict)
        invite_contacts = InviteMapper.get_contacts_from_dict(invite_dict)

        invite_model = InviteModel(invite_entity, user=self.user)
        invite_id = invite_model.put()
        invite_model.add_contacts(invite_contacts)

        invite_model.send_async()
        invite_model.invite_contacts_async(invite_contacts)

        return invite_id

    def view(self, id):
        """Get the full invite, with contacts and responses"""
        return InviteMapper.invite_to_dict_with_contact_responses(
            self._get_invite_model(id)
        )

        return InviteMapper.invite_to_dict_with_contact_responses()

    def search(self, user_id):
        """Search all the invites with the given term in the title"""
        term = self.request.get('term', None)

        if term is None:
            return self.get_by_user_id(user_id)

        user = User.get_by_id(long(user_id))
        if not user:
            raise Exception("Please provide a valid user")

        index = search.Index(name=InviteModel.invite_index)
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

        return [InviteMapper.invite_to_dict(InviteModel(x)) for x in invites]

    def accept_response(self, invite_id, contact_id):
        data = self._data()

        invite_model = self._get_invite_model(invite_id)
        if data.get('response', 'no').lower() == 'yes':
            invite_model.accept(contact_id, data.get('channel', 'email'))
        else:
            invite_model.deny(contact_id, data.get('channel', 'email'))

    @user_context
    def add_comment(self, id):
        data = self._data()

        if self.user is not None:
            data['author'] = self.user.fullname()

        invite_model = self._get_invite_model(id)
        invite_model.add_comment(data['author'], data['comment'])

        return {
            'author': data['author'],
            'comment': data['comment']
        }

    def get_comments(self, id):
        invite_model = self._get_invite_model(id)
        return invite_model.get_comments()

    def _get_invite_model(self, invite_id):
        invite_entity = Invite.get_by_unique_id(invite_id)

        if invite_entity is None:
            raise Exception("Invite not found with id: %s" % invite_id)

        return InviteModel(invite_entity)

