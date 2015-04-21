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


class AttendeeNotificationHandler(JsonHandler):

    def acknowledge(self, attendee_notification_id):
        """Acknowledge attending the event or not"""

        command = commands.AcknowledgeInviteCommand(
            attendee_notification_id = attendee_notification_id,
            attending = self._data().get('attending')
        )
        command.execute()
        return attendee_notification_id

