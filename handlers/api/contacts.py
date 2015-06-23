import base64
import logging
import uuid
import json
import csv
import StringIO

from managers.auth import user_context
from base import JsonHandler
from google.appengine.ext import ndb
from managers.contact_model import ContactModel
from models import Contact
from boilerplate.models import User
from managers.group import GroupManager
from commands import UpdateOrCreateContactCommand, DeleteContactCommand
from handlers.security import authentication_required, invite_permission_required

class ApiContactHandler(JsonHandler):

    @authentication_required
    def get(self):
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

    @authentication_required
    def add_contact(self):
        contact_data = self._data().get('contact')
        command = UpdateOrCreateContactCommand(
            self.user,
            name=contact_data['name'],
            email=contact_data['email'],
            phone=contact_data['phone']
        )
        return command.execute()

    @authentication_required
    def update_contact(self, unique_id):
        contact_data = self._data().get('contact')

        command = UpdateOrCreateContactCommand(
            self.user,
            unique_id=unique_id,
            name=contact_data['name'],
            email=contact_data['email'],
            phone=contact_data['phone']
        )
        return command.execute()

    @authentication_required
    def delete_contact(self, unique_id):
        user = User.get_by_id(long(user_id))
        command = DeleteContactCommand(user, unique_id)
        return command.execute()

    @authentication_required
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


