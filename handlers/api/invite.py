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
from boilerplate.models import User
from managers.invite.commands import CreateInviteCommand, UpdateInviteCommand


class InviteHandler(JsonHandler):

    def get(self, invite_id):
        """Get the full invite, with contacts and responses"""
        return InviteMapper.invite_to_dict_with_attendee_responses(
            InviteModel.create_from_id(invite_id)
        )

    @user_context
    def post(self, invite_id=None):
        """Save the invite"""
        invite_dict = self._data()

        command = None
        if not invite_id:
            command = CreateInviteCommand.read_from_dict(invite_dict)
        else:
            command = UpdateInviteCommand.read_from_dict(invite_id, invite_dict)
        return command.execute()

    # @user_context
    # def post(self, invite_id=None):
    #     """Save the invite"""
    #     invite_dict = self._data()
    #
    #     #Mapping
    #     posted_entity = InviteMapper.get_from_dict(invite_dict)
    #
    #     db_invite = None
    #     if invite_id:
    #         db_invite = Invite.get_by_unique_id(invite_id)
    #     else:
    #         db_invite = Invite.create_new_with_id()
    #
    #     invite_model = InviteModel(db_invite, user=self.user)
    #     invite_model.copy_over(posted_entity)
    #
    #     return invite_model.unique_id

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

