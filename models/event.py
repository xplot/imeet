from google.appengine.ext import ndb
from .models import UniqueIDModel
MAX_RETRIES = 6


class EventStatus(object):
    CREATED = 'created'
    IN_PROCESS = 'in_process'
    SENT = 'sent'
    FAILED = 'failure'


class EventGroup(UniqueIDModel):
    grouper_unique_id = ndb.StringProperty(required=True)


class Event(UniqueIDModel):
    endpoint = ndb.StringProperty()
    headers = ndb.TextProperty(indexed=False)
    method = ndb.StringProperty(indexed=False)
    payload = ndb.TextProperty(indexed=False)
    created = ndb.DateTimeProperty(auto_now_add=True, indexed=False)
    retries = ndb.IntegerProperty(default=0, indexed=False)
    status = ndb.StringProperty(indexed=False)
    priority = ndb.IntegerProperty(default=0, required=True, indexed=False)
    group_id = ndb.StringProperty()

    @classmethod
    def get_all_events_by_group(cls, group_id):
        """Gets an Event by its unique_id"""
        return cls.query(cls.group_id == group_id).fetch()

    def hold_event(self):
        """
            Check if the event has to hold because a higher priority event
             has not executed on the same group
        """
        group = self.get_all_events_by_group(self.group_id)

        for event in group:
            if event.priority < self.priority and event.status == EventStatus.FAILED:
                return True
        return False

    def skip_event(self):
        """Check if the event has to be skipped under certain conditions"""
        if self.status == EventStatus.SENT:
            return True

        if self.retries >= MAX_RETRIES:
            return True
        return False