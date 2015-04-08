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
from managers.invite import InviteMapper, InviteModel, BulkInviteAttendeeModel
from models import Invite
from boilerplate.models import User


class InviteAttendeeHandler(JsonHandler):

    @user_context
    @request_with_subscription
    def add_attendees(self, invite_id):
        """Creates many invite attendees"""
        attendees = InviteMapper.get_attendees_model_from_dict(
            InviteModel.create_from_id(invite_id),
            self._data().get('attendees', [])
        )
        bulk_invite = BulkInviteAttendeeModel()
        bulk_invite.include_attendees(attendees)

    @user_context
    @request_with_subscription
    def notify_all(self, invite_id):
        """Send the invite out to all the contacts"""
        bulk_invite = BulkInviteAttendeeModel(
            InviteModel.create_from_id(invite_id)
        )
        bulk_invite.notify_all()

    @user_context
    @request_with_subscription
    def notify_some(self, invite_id):
        """Send the invite out to some of the contacts"""
        attendees = self._data()
        bulk_invite = BulkInviteAttendeeModel(
            InviteModel.create_from_id(invite_id)
        )
        bulk_invite.notify_attendees(attendees)

    def accept_response(self, invite_id, invite_contact_id):
        data = self._data()

        invite_model = InviteModel.create_from_id(invite_id)
        if data.get('response', 'no').lower() == 'yes':
            invite_model.accept(invite_contact_id, data.get('channel', 'email'))
        else:
            invite_model.deny(contact_id, data.get('channel', 'email'))
