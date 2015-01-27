from boilerplate.basehandler import BaseHandler
from models.models import Contact


class ContactHandler(BaseHandler):
    def get(self):
        contactlist = Contact.query().fetch()

        if contactlist is None:
            contactlist = []
        return self.render_template(
            'views/contacts.html',
            contacts=contactlist,
            show_search=len(contactlist)>1
        )
