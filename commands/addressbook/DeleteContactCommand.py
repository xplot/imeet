from managers.utils import guid, copy_over
from models import Contact


class DeleteContactCommand(object):
    def __init__(self, user, unique_id):
        self.user = user
        self.unique_id = unique_id

    def execute(self):
        contact = Contact.get_by_user_and_unique_id(self.user, self.unique_id)
        contact.key.delete()
        return self.unique_id