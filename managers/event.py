import logging
import requests
import uuid
import urlparse
import datetime
import json
from google.appengine.api import taskqueue

from managers.utils import guid
from models.event import Event, EventStatus, EventGroup

MEMCACHED_KEY = "WebHookApi_MEM_KEY_TXY"
QUEUE_NAME = "webhook-event"


class EventQueue(object):
    """
    ---------------------------------------------------------------------------
       REST Api functionality.
       The following functions will be REST accessible
       Routes are defined in main.py
    ---------------------------------------------------------------------------
    """
    @classmethod
    def push_event(cls,
                   endpoint,
                   payload=None,
                   method='POST',
                   headers=None,
                   priority=0,
                   group_id=None):
        """
        Will push an event to the event queue.

        endpoint:   URL to call while executing the event
        payload:    Dictionary of GET params or body JSON
        method:     GET|POST
        headers:    Headers while executing the request
        priority:   Will be used to block events while lower priorities
                    events have failed. An event will only execute
                    if it' the next top priority on that group
        group_id:   Grouping of events, if None, an event will have it's
                    own unique group
        """
        if not payload:
            payload = {}

        if not group_id:
            group_id = guid()

        event = Event()
        event.created = datetime.datetime.now()
        event.headers = json.dumps(headers) or ''
        event.method = method
        event.payload = json.dumps(payload)
        event.endpoint = endpoint
        event.status = EventStatus.CREATED
        event.priority = priority
        event.group_id = group_id
        event.put()

        q = taskqueue.Queue(QUEUE_NAME)
        q.add([taskqueue.Task(
            name=cls._get_cutie_task_name(event.unique_id),
            payload=event.unique_id,
            method='PULL'
        )])

    @classmethod
    def _get_cutie_task_name(cls, event_id):
        return "event_" + event_id

    @classmethod
    def create_event_group(cls, unique_object_id):
        group_id = EventQueue.get_group_id(unique_object_id)
        if group_id:
            return group_id
        group = EventGroup(
            unique_id=guid(),
            grouper_unique_id=unique_object_id
        )
        group.put_async()
        return group.unique_id

    @classmethod
    def get_group_id(cls, unique_object_id):
        group = EventGroup.query(EventGroup.grouper_unique_id == unique_object_id).get()
        if group:
            return group.unique_id
        return None

class EventDispatcher(object):
    """
    Will process the event queue on a blocked basis
    meaning each event will be retried a few times until is dropped.
    Then and only then, the queue will continue
    """

    def process_queue(self):
        """
            Process the event queue in batches
            Events status are going to be updated in Datastore

            TODO: Implement a priority mechanism, and a relation between events
            so all events from a single Invite are related under the same bucket
            The queue will only be stopped for that invite,
            and will continue for the other invites, and it's events

            For now, the whole queue will be stopped if one event fails.
        """
        q = taskqueue.Queue(QUEUE_NAME)

        event_tasks = q.lease_tasks(10, 50)
        delete_tasks = []

        for event_task in event_tasks:
            event_id = event_task.payload

            logging.info("Processing EventId: %s" % event_id)

            event = Event.get_by_unique_id(event_id)

            if event is None or event.skip_event():
                logging.info(
                    "Task will not retry"
                    "Either the event is nonexistent or it reached MAX retries"
                )
                delete_tasks.append(event_task)
                continue

            #Everything below will mean event.retries ++
            event.retries += 1

            if event.hold_event():
                logging.info(
                    "Event will be hold, because higher priority event, has to be processed"
                )
                event.status = EventStatus.FAILED
            else:
                try:
                    logging.info("Event URL: %s" % event.endpoint)
                    logging.info("This is going to be sent: ")
                    logging.info(event.payload)

                    self._make_request(event)

                    event.status = EventStatus.SENT
                    delete_tasks.append(event_task)
                except Exception, e:
                    logging.exception(e)
                    event.status = EventStatus.FAILED

            event.put()

            if event.status == EventStatus.FAILED:
                #We always break, then retry, events are considered blockers
                break
        #Finally we delete those tasks that executed successfully
        q.delete_tasks(delete_tasks)

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

