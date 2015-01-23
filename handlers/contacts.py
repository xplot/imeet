from boilerplate.basehandler import BaseHandler


class ContactHandler(BaseHandler):
    def get(self):
        return self.render_template('views/contacts.html')
