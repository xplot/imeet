import logging
import requests
import uuid
import urlparse
import datetime
import json
from google.appengine.api import taskqueue

from base import JsonHandler
from models.event import Event


class EventStatus(object):
    CREATED = 'created'
    IN_PROCESS = 'in_process'
    SENT = 'sent'
    FAILED = 'failure'

MAX_RETRIES = 6
MEMCACHED_KEY = "WebHookApi_MEM_KEY_TXY"
QUEUE_NAME = "webhook-event"


class EventQueue(object):
    # ---------------------------------------------------------------------------
    #   REST Api functionality.
    #   The following functions will be REST accessible
    #   Routes are defined in main.py
    # ---------------------------------------------------------------------------
    @classmethod
    def push_event(self, endpoint, payload=None, method='POST', headers=None):

        if not payload:
            payload = {}

        event = Event()
        event.unique_id = str(uuid.uuid4()).replace('-', '')
        event.created = datetime.datetime.now()
        event.headers = json.dumps(headers) or ''
        event.method = method
        event.payload = json.dumps(payload)
        event.endpoint = endpoint
        event.status = EventStatus.CREATED
        event.put()

        q = taskqueue.Queue(QUEUE_NAME)
        q.add([taskqueue.Task(
            name=self._get_cutie_task_name(event.unique_id),
            payload=event.unique_id,
            method='PULL'
        )])

    @staticmethod
    def _get_cutie_task_name(event_id):
        return "event_" + event_id

class EventDispatcher(JsonHandler):


    def process_queue(self):
        """
            Process the event queue in batches
            Events status are going to be updated in Datastore
        """
        q = taskqueue.Queue(QUEUE_NAME)

        event_tasks = q.lease_tasks(600, 100)
        delete_tasks = []

        for event_task in event_tasks:
            event_id = event_task.payload
            event = Event.get_by_unique_id(event_id)

            if event is None or self._check_skip_event(event):
                logging.info(
                    "Task will not retry"
                    "Either the event is nonexistent or it reached MAX retries"
                )
                delete_tasks.append(event_task)
                continue

            try:
                event.retries += 1

                logging.info("Event URL: %s" % event.endpoint)
                logging.info("This is going to be sent: ")
                logging.info(event.payload)

                self._make_request(event)

                event.status = EventStatus.SENT
            except Exception, e:
                logging.exception(e)
                event.status = EventStatus.FAILED

            event.put()

            if event.status == EventStatus.FAILED:
                #We always break, then retry, events are considered blockers
                break

        #Finally we delete those tasks that executed successfully
        q.delete_tasks(delete_tasks)

    def _check_skip_event(self, event):
        """Check if the event has to be skipped under certain conditions"""

        if event.status == EventStatus.SENT:
            return True

        if event.retries >= MAX_RETRIES:
            return True
        return False

    def _make_request(self, event):
        """Executes the actual request to the event endpoint"""
        timeout = 30

        response = None
        if event.method == 'GET':
            response = requests.get(
                event.endpoint,
                headers=json.loads(event.headers),
                data=json.loads(event.payload),
                timeout=timeout
            )
        else:
            response = requests.post(
                event.endpoint,
                headers=json.loads(event.headers),
                data=event.payload,
                timeout=timeout
            )

        response.raise_for_status()
        return response

