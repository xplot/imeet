from base import JsonHandler
from managers import InviteManager


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

    def search(self, term):
        invite_manager = InviteManager()
        return invite_manager.search(term)

    def accept_response(self,invite_id, contact_id):
        data = self._data()
        invite_manager = InviteManager()
        return invite_manager.accept(
            invite_id,
            contact_id,
            data['channel'],
            data['response']
        )