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


class InviteAttendeeResponseHandler(JsonHandler):

    def acknowledge(self, invite_attendee_id):
        """
        Acknowledge attending the event or not
        This is a valid post format:
        {
            'response': '',
            'channel': ''
        }
        """

        command = commands.AcknowledgeInviteCommand(
            invite_attendee_id=invite_attendee_id,
            attending=self._data().get('response'),
            channel=self._data().get('channel')
        )
        command.execute()
        return invite_attendee_id
