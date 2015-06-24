from managers.utils import guid
from datetime import datetime
from models import Invite
from google.appengine.ext import ndb
from .BulkNotifyAttendeesCommand import BulkNotifyAttendeesCommand


class NotifyAllAttendeesCommand(object):
    def __init__(self, invite_unique_id, invite=None):
        self.invite_unique_id = invite_unique_id
        self.invite = invite

    def execute(self):
        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)
        invite_attendees = self.invite.get_attendees()

        if self.invite.start < datetime.now():
            raise Exception("Invite is in the past, it cannot be broadcasted")

        if not invite_attendees:
            raise Exception("The invite has no attendees")

        bulk = BulkNotifyAttendeesCommand(
            invite=self.invite,
            attendees_unique_ids=[x.unique_id for x in self.invite.get_attendees()]
        )
        bulk.execute()