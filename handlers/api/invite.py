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
from query import CompleteInviteQuery, UserInvitesQuery
from models import Invite, InvitePermission
from boilerplate.models import User
from commands import CreateInviteCommand, UpdateInviteCommand, UpdateInviteTitleCommand, UpdateInviteDescriptionCommand
from handlers.security import authentication_required, invite_permission_required, authentication_if_possible


class InviteHandler(JsonHandler):

    @authentication_required
    def get_all_from_user(self):
        """Get all invites where user is organizer/host"""
        term = self.request.get('term', None)
        user = self.user
        return UserInvitesQuery(user, search_term=term).query()

    @invite_permission_required(InvitePermission.Attendee)
    def get(self, invite_id, invite_attendee_id=None):
        """Get the full invite, with contacts and responses"""
        query = CompleteInviteQuery(invite_id)
        return query.query()

    @authentication_if_possible
    def create_invite(self):
        """Create a new Invite"""
        invite_dict = self._data()
        return CreateInviteCommand.read_from_dict(invite_dict, self.user).execute()

    @invite_permission_required(InvitePermission.Organizer)
    def save_invite(self, invite_id):
        """Save the invite"""
        invite_dict = self._data()
        return UpdateInviteCommand.read_from_dict(invite_id, invite_dict).execute()

    @invite_permission_required(InvitePermission.Organizer)
    def update_title(self, invite_id=None):
        """Save the invite"""
        title_dict = self._data()

        command = UpdateInviteTitleCommand(
            invite_unique_id=invite_id,
            invite_title=title_dict.get('title')
        )
        command.execute()

    @invite_permission_required(InvitePermission.Organizer)
    def update_description(self, invite_id=None):
        """Save the invite"""
        description_dict = self._data()

        command = UpdateInviteDescriptionCommand(
            invite_unique_id=invite_id,
            invite_description=description_dict.get('description')
        )
        command.execute()
