import logging

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

class InviteHandler(JsonHandler):

    @user_context
    @request_with_subscription
    def send(self):
        invite_dict = self._data()

        #Mapping
        invite_entity = InviteMapper.get_from_dict(invite_dict)
        invite_contacts = InviteMapper.get_contacts_from_dict(invite_dict)

        invite_model = InviteModel(invite_entity, user=self.user)
        invite_id = invite_model.put()
        invite_model.add_contacts(invite_contacts)

        #Just a temporary Model_ID
        #In the future this should be selected in the UI
        template_model = TemplateModel(0)

        invite_model.send_async(template_model)
        invite_model.notify_people_async(invite_contacts)

        return invite_id

    def view(self, id):
        invite_entity = Invite.get_by_unique_id(id)

        if invite_entity is None:
            raise Exception("Invite not found with id: %s" % id)

        invite_model = InviteModel(invite_entity)
        return InviteMapper.invite_to_dict(invite_model)

    def search(self, user_id):
        term = self.request.get('term', None)
        invite_manager = InviteManager()
        return invite_manager.search(user_id, term)

    def accept_response(self, invite_id, contact_id):
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

        headers = {
            'Content-type': 'application/json',
            'Accept': 'text/plain',
            'Date': now,
            'Authorization': authToken
        }

        invite = Invite.get_by_unique_id(self.request.get('invite_id'))
        invite_model = InviteModel(invite_entity)
        invite_json = InviteMapper.invite_to_dict(invite_model)

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



