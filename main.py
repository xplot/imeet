import json
import jinja2
import logging
import os,sys
import webapp2

from datetime import time
from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import Route

from models import Invite,Contact, ContactInvite, data_type_handler
from managers import InviteManager

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

    def new(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

    def search(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

    def view(self, id=0):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())


class InviteHandler(JsonHandler):

    def send(self):
        data = self._data()

        logging.info(data)

        invite_manager = InviteManager()
        invite_manager.create(data)
        invite_manager.send(data)
        return True

    def view(self, id=0):
        invite_manager = InviteManager()
        return invite_manager.get(id)

    def accept_response(self,invite_id, contact_id):
        data = self._data()
        invite_manager = InviteManager()
        return invite_manager.accept(
            invite_id,
            contact_id,
            data['channel'],
            data['response']
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

    Route('/new', MainHandler, handler_method='new', ),
    Route('/search', MainHandler, handler_method='search', ),
    Route('/view', MainHandler, handler_method='view'),
    Route('/view/<id>', MainHandler, handler_method='view'),

    Route('/contact_form', EmailHandler, name='contact',
          handler_method='send', methods=['POST']),

    Route('/api/invite', InviteHandler, name='send',
          handler_method='send', methods=['POST']),

    Route('/api/invite/<id>', InviteHandler, name='view',
          handler_method='view', methods=['GET']),

    Route('/api/<invite_id>/contact/<contact_id>/response', InviteHandler, name='accept_response',
          handler_method='accept_response', methods=['POST']),
], debug=True)
