import json
import jinja2
import logging
import os,sys
import webapp2

from datetime import time
from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import Route, RequestHandler

import config
import boilerplate
from main import JINJA_ENVIRONMENT
from models import Invite,Contact, ContactInvite, data_type_handler
from managers import InviteManager
from boilerplate.basehandler import BaseHandler

class Request(ndb.Model):
    request = ndb.TextProperty()
    type = ndb.StringProperty()
    date = ndb.DateTimeProperty()

class JsonHandler(RequestHandler):
    """
    Handles setting Content-Type to application/json
    and returning of consistently formatted JSON results.
    """
    def __init__(self, request, response):
        self.request_data = None
        super(JsonHandler, self).__init__(request, response)

    @webapp2.cached_property
    def jinja2(self):
        return JINJA_ENVIRONMENT

    def dispatch(self):
        try:
            self.response.content_type = 'application/json'
            result = super(JsonHandler, self).dispatch()

            self.api_success(result)
        except Exception, e:
            lo
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
        try:
            if self.request_data is None:
                data_string = self.request.body
                self.request_data = json.loads(data_string)
        except:
            logging.info(self.request)
            logging.info(self.request.body)
        return self.request_data

    def get_response(self):
        raise Exception("hello world")

    def render_template(self, filename, **kwargs):
        # set or overwrite special vars for jinja templates
        kwargs.update({
            'google_analytics_code': self.app.config.get('google_analytics_code'),
            'app_name': self.app.config.get('app_name'),
            'url': self.request.url,
        })
        template = self.jinja2.get_template(filename)
        self.response.write(template.render(**kwargs))

class SendEmailHandler(BaseHandler):
    """
    Core Handler for sending Emails
    Use with TaskQueue
    """
    def post(self):
        """ Email Sender.

            The Sender is going to be chosen as follows:
             1 - If Provided we'll try to use it.
             1.1 - IF Provided failed. We GOTO 2
             2 - If Not Provided we use our config email address.
             3 - If no config address we will use an address with the form no-reply@<app-id>.appspotmail.com

        """
        try:
            to = self.request.get("to")
            subject = self.request.get("subject")
            body = self.request.get("body")
            sender = self.request.get("sender")

            if not sender:
                sender = self.app.config.get('email_sender')

            if self.app.config.get('log_email',False):
                try:
                    log_email = boilerplate.models.LogEmail(
                        sender=sender,
                        to=to,
                        subject=subject,
                        body=body,
                        when=boilerplate.lib.utils.get_date_time("datetimeProperty")
                    )
                    log_email.put()
                except:
                    logging.error("Error saving Email Log in datastore")

            message = mail.EmailMessage()
            message.sender = sender
            message.to = to
            message.subject = subject
            message.html = body
            message.send()

        except Exception as e:
            logging.error(e)
            raise

class MainHandler(BaseHandler):
    def get(self):
        return self.render_template('index.html')

    def new(self):
        return self.render_template('index.html')

    def search(self):
        return self.render_template('index.html')

    def view_invite(self, id=0):
        return self.render_template('index.html')

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

