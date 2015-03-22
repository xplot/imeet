import logging

import json
import requests
import hmac
import hashlib
import base64

from datetime import datetime
from base import JsonHandler
from config import config
from managers.template import TemplateModel
from managers.auth import user_context, request_with_subscription
from managers.invite import InviteMapper, InviteModel
from models.models import Invite

class InviteHandler(JsonHandler):

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
        invite_entity = Invite.get_by_unique_id(id)

        if invite_entity is None:
            raise Exception("Invite not found with id: %s" % id)

        invite_model = InviteModel(invite_entity)
        return InviteMapper.invite_to_dict_with_contact_responses(invite_model)

    def search(self, user_id):
        term = self.request.get('term', None)
        invite_manager = InviteManager()
        return invite_manager.search(user_id, term)

    def accept_response(self, invite_id, contact_id):
        data = self._data()
        invite_manager = InviteManager()
        return invite_manager.accept(
            invite_id,
            contact_id,
            data['channel'],
            data['response']
        )

    @user_context
    def add_comment(self, id):
        data = self._data()

        if self.user is not None:
            data['author'] = self.user.fullname()

        InviteManager().add_comment(id, data['author'], data['comment'])

        return {
            'author': data['author'],
            'comment': data['comment']
        }

    def get_comments(self, id):
        return InviteManager().get_comments(id)



