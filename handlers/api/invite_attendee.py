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

    @user_context
    def get_attendee_from_user_id(self, invite_id):
        if not self.user:
            return None

        return query.InviteAttendeeByUserQuery(
            invite_id=invite_id,
            user=self.user
        ).query()

    #@request_with_subscription
    @user_context
    def post(self, invite_id):
        """Includes an Attendee in the Invite"""
        command = commands.BulkAddInviteAttendeeCommand.read_from_dict(
            invite_id,
            self._data().get('attendees')
        )
        return command.execute()

    def delete(self, invite_id, unique_id):
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
        return command.execute()

    @user_context
    #@request_with_subscription
    def notify_all(self, invite_id):
        """Send the invite out to all the contacts"""
        invite_all = commands.NotifyAllAttendeesCommand(invite_unique_id=invite_id)
        invite_all.execute()
        return invite_id

    @user_context
    @request_with_subscription
    def notify_some(self, invite_id):
        """Send the invite out to some of the contacts"""
        attendees = self._data()
        invite_some = commands.BulkNotifyAttendeesCommand(
            invite_unique_id=self.invite_id,
            attendees_unique_ids=attendees
        )
        invite_some.execute()
        return invite_id

    #@request_with_subscription
    @user_context
    def update_attendee(self, invite_id):
        """Update Attendee Details"""
        invite_attendee_id = self._data().get('invite_attendee_id')
        contact_data = self._data().get('contact')

        return commands.UpdateAttendeeAttachToContactCommand(
            user=self.user,
            invite_id=invite_id,
            invite_attendee_id=invite_attendee_id,
            unique_id=contact_data['unique_id'],
            name=contact_data['name'],
            email=contact_data['email'],
            phone=contact_data['phone'],
       ).execute()


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