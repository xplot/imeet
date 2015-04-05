import uuid
from models import Contact
from google.appengine.ext import ndb
from managers.utils import guid


class ContactManager:
    # user_key is the owner of this ContactManager instance.
    def __init__(self, user_key):
        self.user_key = user_key

    def add_or_update_contact(self, contact):
        current_contact = Contact.query(ndb.OR(Contact.unique_id == contact.unique_id,
                                               ndb.AND(Contact.user == self.user_key,
                                                       ndb.OR(Contact.email == contact.email,
                                                              Contact.phone == contact.phone)))) \
            .get()

        if not current_contact:
            return self.add_contact(contact)
        else:
            return self.update_contact(current_contact, contact)

    def add_contact(self, contact):
        x = Contact(
            unique_id=guid(),
            name=contact.name,
            email=contact.email,
            user=self.user_key
        )
        x.put()
        return x.unique_id

    def update_contact(self, current_contact, contact):
        current_contact.name = contact.name
        current_contact.phone = contact.phone
        current_contact.email = contact.email
        current_contact.user = self.user_key
        return current_contact.unique_id

    def delete_contact(self, unique_id):
        contact = Contact.query(Contact.unique_id == unique_id and Contact.user == self.user_key).get()
        if not contact:
            raise Exception("Contact not found.")
        contact.key.delete()
        return unique_id