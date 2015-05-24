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
from query import CompleteInviteQuery, InviteSearchQuery
from models import Invite
from boilerplate.models import User
from commands import CreateInviteCommand, UpdateInviteCommand, UpdateInviteTitleCommand, UpdateInviteDescriptionCommand


class InviteHandler(JsonHandler):

    def get(self, invite_id):
        """Get the full invite, with contacts and responses"""
        query = CompleteInviteQuery(invite_id)
        return query.query()

    @user_context
    def post(self, invite_id=None):
        """Save the invite"""
        invite_dict = self._data()

        command = None
        if not invite_id:
            command = CreateInviteCommand.read_from_dict(invite_dict, self.user)
        else:
            command = UpdateInviteCommand.read_from_dict(invite_id, invite_dict)
        return command.execute()

    @user_context
    def update_title(self, invite_id=None):
        """Save the invite"""
        title_dict = self._data()

        command = UpdateInviteTitleCommand(
            invite_unique_id=invite_id,
            invite_title=title_dict.get('title')
        )
        command.execute()

    @user_context
    def update_description(self, invite_id=None):
        """Save the invite"""
        description_dict = self._data()

        command = UpdateInviteDescriptionCommand(
            invite_unique_id=invite_id,
            invite_description=description_dict.get('description')
        )
        command.execute()

    def search(self, user_id):
        """Search all the invites with the given term in the title"""
        term = self.request.get('term', None)
        user = User.get_by_id(long(user_id))
        return InviteSearchQuery(user, term).query()
