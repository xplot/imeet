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

class VoiceflowsHandler(JsonHandler):

    def post_invite_to_notifications_api(self):
        """Will post the invite to The API"""
        url = config.get('api_url')
        self._call_api(url, self.request.body)

    def post_contacts_to_notifications_api(self):
        """Will post the contact notifications to The API"""
        url = config.get('api_url') + "/contacts"
        self._call_api(url, self.request.body)

    def post_invite_cancel_to_notifications_api(self, invite_id):
        """Will Post the cancellation notifications"""
        url = config.get('api_url') + "/cancel"
        self._call_api(url, self.request.body)

    def _call_api(self, url, data=None):
        headers = self._get_api_headers()
        r = requests.post(
            url,
            data=data,
            headers=headers
        )

        if r.status_code != 200:
            logging.error(r.text)
        r.raise_for_status()

    def _get_api_headers(self):
        now = datetime.utcnow().strftime("%a, %d %b %Y %H:%M:00 GMT")
        secret = '8\x0c7_\x01\t/{C)6V`\x1c!'
        dig = hmac.new(secret, msg=now, digestmod=hashlib.sha256).digest()
        authToken = "Voiceflows " + base64.b64encode(dig).decode()

        return  {
            'Content-type': 'application/json',
            'Accept': 'text/plain',
            'Date': now,
            'Authorization': authToken
        }