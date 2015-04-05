import base64
import logging
import uuid
import json
import csv
import StringIO

from managers.auth import user_context
from base import JsonHandler
from google.appengine.ext import ndb
from managers.contact import ContactManager
from models import Contact
from boilerplate.models import User
from managers.group import GroupManager

class ApiContactHandler(JsonHandler):

    @user_context
    def get(self):
        if self.user is None:
            return []

        return [
            {
                'unique_id': x.unique_id,
                'name': x.name,
                'phone': x.phone,
                'email': x.email
            }
            for x in Contact.query(
                Contact.user == self.user.key
            ).order(Contact.name).fetch()
        ]

    @user_context
    def add_contact(self):
        contact_mgr = ContactManager(self.user.key)

        contact_data = self._data().get('contact', None)
        contact = Contact()
        contact.name = contact_data['name']
        contact.email = contact_data['email']
        contact.phone = contact_data['phone']
        return contact_mgr.add_or_update_contact(contact)

    def update_contact(self, unique_id):
        data = self._data()
        contact_mgr = ContactManager(self.user.key)

        contact = Contact()
        contact.name = data['name']
        contact.email = data['email']
        contact.phone = data['phone']

        return contact_mgr.add_or_update_contact(contact)

    def delete_contact(self, user_id, unique_id):
        user_key = User.get_by_id(long(user_id)).key
        contact_mgr = ContactManager(user_key)
        contact_mgr.delete_contact(unique_id)
        return True

    @user_context
    def import_csv(self):
        data = self._data()
        contact_mgr = ContactManager(self.user.key)
        index = data["file"].find('base64,') + 7
        csv_string = data["file"][index:].decode('base64')

        f = StringIO.StringIO(csv_string)
        contacts = csv.DictReader(f)
        for contact_data in contacts:
            contact = Contact()
            contact.name = contact_data['name']
            contact.email = contact_data['email']
            contact.phone = contact_data['phone']
            contact_mgr.add_or_update_contact(contact)

        return True


