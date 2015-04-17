from managers.utils import guid, copy_over
from models import Contact

class NoUserException(Exception):
    pass


class UpdateOrCreateContactCommand(object):
    def __init__(self, user, unique_id=None, name=None, email=None, phone=None):
        if not user:
            raise NoUserException()

        self.user = user.key
        self.unique_id = unique_id
        self.name = name
        self.email = email
        self.phone = phone

    def execute(self):
        contact = None
        if self.unique_id:
            contact = Contact.get_by_unique_id(self.unique_id)
        else:
            contact = Contact(
                unique_id=guid(),
            )

        copy_over(self, contact)
        contact.put()
        return contact.unique_id