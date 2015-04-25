import json
import logging
from datetime import datetime
import webapp2
from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import RequestHandler

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
        except Exception, e:
            self.error(500)
            self.json_handle_exception(e, False)

    def __render_json__(self, data):
        if data is not None:
            self.response.write(json.dumps(data, cls=DateTimeEncoder))
        else:
            self.response.status = 204

    def api_success(self, data=None):
        self.response.status = 200
        self.__render_json__(data)

    def set_location_header(self, model):
        self.response.headers["Location"] = "{0}/{1}".format(self.request.path, model.key().id())

    def json_handle_exception(self, exception, debug):
        logging.exception(exception)
        if exception is not None and exception.message is not None:
            self.__render_json__(exception.message)

    def _data(self):
        try:
            if self.request_data is None:
                data_string = self.request.body
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