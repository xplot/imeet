import logging
import requests
import uuid
import urlparse
import datetime
import json
import logging

from google.appengine.api import taskqueue

from base import JsonHandler
from models.event import Event
from managers.event import EventDispatcher


class EventCronHandler(JsonHandler):

    def process_queue(self):
        logging.info("Starting to process event queue")
        event_dispatcher = EventDispatcher()
        event_dispatcher.process_queue()

