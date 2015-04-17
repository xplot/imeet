import json
from google.appengine.api import search, taskqueue


class EventDispatcher(object):
    @classmethod
    def push_event(self, endpoint, data):
        """Enqueue the event to the endpoint"""
        taskqueue.add(
            url=endpoint,
            payload=json.dumps(data)
        )