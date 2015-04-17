import uuid
from models import Contact, InviteAttendee
from google.appengine.ext import ndb
from managers.utils import guid

class ContactModel:

    def __init__(self, contact, user):
        self.user = user
        self.contact = contact

        if not self._invite_id and not self.user_key:
            raise Error("Contact has to be associated to an invite or to a user")

    def __getattr__(self, name):
        return getattr(self.invite, name)

    def copy_over(self, contact):
        self.contact.name = contact.name
        self.contact.email = contact.email
        self.contact.phone = contact.phone
        self.contact.put()

    def put(self):
        if not self.unique_id:
            self.contact.unique_id = guid()

        if self.user:
            self.contact.user = self.user.key
        self.contact.put()

    def delete(self):
        self.contact.key.delete()
        return unique_id

    @classmethod
    def search_by_email_or_phone(cls, email=None, phone=None):

        #Let's try to lookup a contact with the same details
        if phone and email:
            contact_in_address_book = Contact.query(
                ndb.OR(
                    Contact.email == email,
                    Contact.phone == phone
                )
            ).get()
        elif phone and not email:
            contact_in_address_book = Contact.query(
                Contact.phone == phone
            ).get()
        elif email and not phone:
            contact_in_address_book = Contact.query(
                Contact.email == email
            ).get()
        else:
            return None