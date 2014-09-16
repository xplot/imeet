import webapp2
import json
import os
import datetime
import urllib
from google.appengine.ext import ndb
import jinja2
import logging
from webapp2 import Route
from google.appengine.api import mail

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


class EmailHandler(webapp2.RequestHandler):
    def send(self):
        email = self.request.get('email')
        name = self.request.get('email')
        phone = self.request.get('email')
        message = self.request.get('email')

        if email is not None:
            mail.send_mail(
                sender="Support VoiceFlows <support@voiceflows.com>",
                to="support@voiceflows.com",
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
], debug=True)
