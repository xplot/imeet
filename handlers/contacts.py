from boilerplate.basehandler import BaseHandler
import logging
import uuid
from google.appengine.ext import ndb
from models.models import Contact
import json


class ContactHandler(BaseHandler):
    def get(self):
        contactlist = Contact.query().fetch()

        return self.render_template(
            'contacts.html',
            contacts=contactlist or [],
            show_search=len(contactlist) > 1
        )

    def add_contact(self):
        data = json.loads(self.request.body)

        #todo: Check if the name, email, phone exists.
        contact = Contact()
        contact.unique_id = str(uuid.uuid4()).replace('-', '')
        contact.name = data['name']
        contact.email = data['email']
        contact.phone = data['phone']
        contact.put()

        self.response.content_type = 'application/json'
        self.response.write(json.dumps(contact.unique_id))
        #return contact

    def delete_contact(self, contact_id):
        logging.info(contact_id)
        contact = Contact.get_by_id(contact_id)
        contact.key.delete()
