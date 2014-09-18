import datetime
import json
import jinja2
import logging
import os,sys
import uuid
import webapp2

from datetime import time
from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import Route

from models import Invite,Contact, ContactInvite, data_type_handler

here = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, os.path.join(here, 'lib'))

import requests

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class Request(ndb.Model):
    request = ndb.TextProperty()
    type = ndb.StringProperty()
    date = ndb.DateTimeProperty()


class JsonHandler(webapp2.RequestHandler):
    """
    Handles setting Content-Type to application/json
    and returning of consistently formatted JSON results.
    """
    def __init__(self, request, response):
        self.request_data = None
        super(JsonHandler, self).__init__(request, response)

    def dispatch(self):
        try:
            self.response.content_type = 'application/json'
            result = super(JsonHandler, self).dispatch()
            if result is not None:
                self.api_success(result)
        except Exception, e:
            if not self.response.status:
                self.error(500)
            self.handle_exception(e, False)

    def __render_json__(self, data):
        self.response.write(json.dumps(data))

    def api_success(self, data=None):
        self.response.status = 200
        self.__render_json__(data)

    def set_location_header(self, model):
        self.response.headers["Location"] = "{0}/{1}".format(self.request.path, model.key().id())

    def handle_exception(self, exception, debug):
        logging.exception(exception)
        self.__render_json__(exception.message)

    def _data(self):
        if self.request_data is None:
            data_string = self.request.body
            self.request_data = json.loads(data_string)
        return self.request_data

    def get_response(self):
        raise Exception("hello world")


class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())


class InviteHandler(webapp2.RequestHandler):

    def send(self):
        logging.info(self.request.body)
        data = json.loads(self.request.body)

        invite = Invite()
        invite.unique_id = str(uuid.uuid4()).replace('-', '')
        invite.title = data['title']
        invite.when = datetime.datetime.strptime(data['when'], "%m/%d/%Y")
        invite.put()

        invite_dict = invite.to_dict()
        invite_dict['contacts'] = []

        db_contacts = []
        for x in data:
            contact = Contact()
            contact.name = x[0]
            contact.phone = x[1]
            contact.email = x[2]
            invite_dict['contacts'].append(contact)
            db_contacts.append(contact)

        ndb.put_multi(db_contacts)

        self._post_invite(invite_dict)


    def _post_invite(self,invite):
        url = "http://www.voiceflows.com/api/invite"
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post(
            url,
            data=json.dumps(
                invite,
                default=data_type_handler,
                indent = 4
            ),
            headers=headers
        )

class EmailHandler(webapp2.RequestHandler):
    def send(self):
        email = self.request.get('email')
        name = self.request.get('email')
        phone = self.request.get('email')
        message = self.request.get('email')

        if email is not None:
            mail.send_mail(
                sender="Support VoiceFlows <javi830810@gmail.com>",
                to="invite@voiceflows.com",
                subject="New Contact Request",
                body="""
                	From %s
                    With Phone %s:

                	Saying: %s
                	""".format(name, phone, message)
            )
        else:
        	self.error(400)
        	self.response.write('invalid email')


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    Route('/contact_form', EmailHandler, name='contact',
          handler_method='send', methods=['POST']),
    Route('/send', InviteHandler, name='send',
          handler_method='send', methods=['POST']),
], debug=True)
