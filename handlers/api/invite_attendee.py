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
from models import Invite
from boilerplate.models import User
import query
import commands
class InviteAttendeeHandler(JsonHandler):

    def get(self, invite_id):
        """Will get the invite attendees"""
        return query.InviteAttendeesQuery(invite_unique_id=invite_id).query()

    #@request_with_subscription
    @user_context
    def post(self, invite_id):
        """Includes an Attendee in the Invite"""
        command = commands.BulkAddInviteAttendeeCommand.read_from_dict(
            invite_id,
            self._data().get('attendees')
        )
        command.execute()
        return invite_id

    @user_context
    def delete(self, unique_id):
        """Includes an Attendee in the Invite"""
        command = commands.RemoveAttendeeCommand(unique_id)
        command.execute()
        return unique_id

    #@request_with_subscription
    @user_context
    def post_group(self, invite_id):
        """Includes all contacts in the group as attendees"""
        group_id = self._data().get('unique_id')

        command = commands.AddGroupAttendeesCommand(
            invite_unique_id=invite_id,
            group_unique_id=group_id,
            user=self.user
        )
        command.execute()
        return invite_id

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

    @classmethod
    def get_list_from_dict(cls, attendees):
        """
        Creates a List of Attendees from the supplied dictionary
        This is a valid data-format:
        [
            {
                'phone': '',
                'email': 'javi@javi.com',
                'name': u''
            }
        ]

        """
        result = []
        for attendee in attendees:
            result.append(
                InviteAttendeeModel(
                    unique_id=attendee.get('unique_id', None),
                    contact_unique_id=attendee.get('contact_unique_id', None),
                    name=attendee.get('name', None),
                    email=attendee.get('email', None),
                    phone=attendee.get('phone', None)
                )
            )
        return result
