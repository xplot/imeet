import logging
import requests

from base import JsonHandler
from managers import InviteManager
from config import config


class InviteHandler(JsonHandler):

    def send(self):
        data = self._data()
        invite_manager = InviteManager()
        invite_manager.create(data)
        invite_manager.send(data)
        return True

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
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

        invite_json = self.request.get('invite')

        logging.info(invite_json)

        r = requests.post(
            url,
            data=invite_json,
            headers=headers
        )