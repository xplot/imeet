import cgi
import json
import logging
from datetime import datetime
import webapp2
from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import RequestHandler
from webob.exc import HTTPError


import boilerplate
from main import JINJA_ENVIRONMENT
from boilerplate.basehandler import BaseHandler
from models import Invite


class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)


class JsonHandler(RequestHandler):
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
            self.api_success(result)
        except HTTPError, he:
            self.error(he.code)
            self.json_handle_exception(he, self.app.debug)
        except Exception, e:
            self.error(500)
            self.json_handle_exception(e, self.app.debug)

    def __render_json__(self, data):
        if data is not None:
            self.response.write(json.dumps(data, cls=DateTimeEncoder))
        else:
            self.response.status = 204

    def api_success(self, data=None):
        self.response.status = 200
        self.__render_json__(data)

    def set_location_header(self, model):
        self.response.headers["Location"] = "{0}/{1}".format(
            self.request.path, model.key().id()
        )

    def json_handle_exception(self, exception, debug):
        logging.exception(exception)
        message = None
        if exception:
            message = exception.message \
                    or getattr(exception, 'detail', None) \
                    or getattr(exception, 'explanation', None)

        if message is None:
            if debug:
                message = type(exception).__name__
            else:
                message = "Unknown Error"

        if exception is not None and message is not None:
            output = {
                'error': message
            }
            self.__render_json__(output)

    def _data(self):
        try:
            if self.request.method == 'DELETE':
                self.request_data = {}
                return

            if self.request_data is None:
                data_string = cgi.escape(self.request.body) # sanitize
                self.request_data = json.loads(data_string)
        except Exception,e:
            raise e
        return self.request_data

    def get_response(self):
        raise Exception("hello world")

    def get_template_rendered(self, filename, **kwargs):
        # set or overwrite special vars for jinja templates
        kwargs.update({
            'google_analytics_code': self.app.config.get('google_analytics_code'),
            'app_name': self.app.config.get('app_name'),
            'url': self.request.url,
        })
        logging.info(filename)
        template = JINJA_ENVIRONMENT.get_template(filename)
        return template.render(**kwargs)