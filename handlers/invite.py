import logging

import requests
import hmac
import hashlib
import base64

from datetime import datetime
from base import JsonHandler
from managers.invite import InviteManager
from config import config
from managers.auth import user_context, request_with_subscription


class InviteHandler(JsonHandler):

    @user_context
    @request_with_subscription
    def send(self):
        data = self._data()

        invite_manager = InviteManager(invite_dict=data, user=self.user)
        invite_id = invite_manager.create(),
        invite_manager.send(
            invite_template={
                'Url': "http://imeet.io/template/default_invite_template.html",

            },
            extra_data={
                'email_response_url': "http://imeet.io/template/default_invite_response.html",
            }
        )

        return invite_id

    def view(self, id=0):
        invite_manager = InviteManager()
        return invite_manager.get(id)

    def search(self, user_id):
        term = self.request.get('term', None)
        invite_manager = InviteManager()
        return invite_manager.search(user_id, term)

    def accept_response(self,invite_id, contact_id):
        data = self._data()
        invite_manager = InviteManager()
        return invite_manager.accept(
            invite_id,
            contact_id,
            data['channel'],
            data['response']
        )

    def post_to_voiceflows(self):
        url = config.get('api_url')
        now = datetime.utcnow().strftime("%a, %d %b %Y %H:%M:00 GMT")
        secret = '8\x0c7_\x01\t/{C)6V`\x1c!'
        dig = hmac.new(secret, msg=now, digestmod=hashlib.sha256).digest()
        authToken = "Voiceflows " + base64.b64encode(dig).decode()

        logging.info(authToken)

        headers = {
            'Content-type': 'application/json',
            'Accept': 'text/plain',
            'Date': now,
            'Authorization': authToken
        }

        invite_json = self.request.get('invite')

        logging.info(invite_json)

        r = requests.post(
            url,
            data=invite_json,
            headers=headers
        )

        if r.status_code != 200:
            logging.error(r.text)
        r.raise_for_status()

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



