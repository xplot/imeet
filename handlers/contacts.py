import base64
import logging
import uuid
import json
import csv
import StringIO

from managers.auth import user_context
from boilerplate.basehandler import BaseHandler
from base import JsonHandler
from google.appengine.ext import ndb
from models.models import Contact
from boilerplate.models import User
from managers.group import GroupManager

class ContactHandler(BaseHandler):
    def get(self):
        if self.user is None:
            self.redirect_to('home')

        group_manager = GroupManager(self.user_key)

        return self.render_template(
            'contacts.html',
            contact_groups=group_manager.get_contacts_sorted_by_group()
        )

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
        data = self._data()

        contact_data = data.get('contact', None)
        #TODO: Check if the name, email, phone exists.
        contact = Contact()
        contact.unique_id = str(uuid.uuid4()).replace('-', '')
        contact.name = contact_data['name']
        contact.email = contact_data['email']
        contact.phone = contact_data['phone']
        contact.user = self.user.key
        contact.put()

        return contact.unique_id

    def update_contact(self, unique_id):
        contact = Contact.query(Contact.unique_id == unique_id).get()

        if not contact:
            raise Exception("Contact not found")

        data = self._data()

        contact.name = data['name']
        contact.email = data['email']
        contact.phone = data['phone']
        contact.put()

        return unique_id

    def delete_contact(self, unique_id):
        contact = Contact.query(Contact.unique_id == unique_id).get()

        if not contact:
            raise Exception("Contact not found")

        contact.key.delete()
        return unique_id

    @user_context
    def import_csv(self):
        data = self._data()
        index = data["file"].find('base64,') + 7
        csv_string = data["file"][index:].decode('base64')

        f = StringIO.StringIO(csv_string)
        contacts = csv.DictReader(f)
        for contact_data in contacts:
            contact = Contact()
            contact.unique_id = str(uuid.uuid4()).replace('-', '')
            contact.name = contact_data['name']
            contact.email = contact_data['email']
            contact.phone = contact_data['phone']
            contact.user = self.user.key
            contact.put()





