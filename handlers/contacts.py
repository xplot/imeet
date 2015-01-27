from boilerplate.basehandler import BaseHandler
from models.models import Contact


class ContactHandler(BaseHandler):
    def get(self):
        contactlist = Contact.query().get()
        if contactlist is None:
            contactlist = []
        return self.render_template('views/contacts.html', contacts=contactlist)
