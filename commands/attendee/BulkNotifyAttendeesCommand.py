from config import config
from managers.utils import guid, get_voiceflows_headers
from managers.event import EventQueue
from models import Invite, InviteAttendee, InviteAttendeeNotification, Contact
from google.appengine.ext import ndb
from query.attendee.InviteAttendeeNotificationQuery import InviteAttendeeNotificationQuery


class BulkNotifyAttendeesCommand(object):
    def __init__(self, invite_unique_id=None, attendees_unique_ids=[], invite=None):
        self.invite_unique_id = invite_unique_id
        self.attendees_unique_ids = attendees_unique_ids
        self.invite = invite

    def execute(self):
        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)

        invite_attendees = InviteAttendee.query(
            InviteAttendee.unique_id.IN(self.attendees_unique_ids)
        ).fetch()

        body = {
            'invite_unique_id': self.invite.unique_id,
            'uniquecall_id': guid(),
            'attendees': []
        }

        bulk_notifications = []

        for invite_attendee in invite_attendees:
            attendee_notification = InviteAttendeeNotification(
                unique_id=guid(),
                invite=self.invite.key,
                attendee=invite_attendee.key,
                name=invite_attendee.name,
                email=invite_attendee.email,
                phone=invite_attendee.phone,
            )

            body['attendees'].append(InviteAttendeeNotificationQuery(
                attendee_notification
            ).query())
            bulk_notifications.append(attendee_notification)

        group_id = EventQueue.get_group_id(self.invite.unique_id)
        EventQueue.push_event(
            endpoint=config.get('api_url') + "/attendees",
            headers=get_voiceflows_headers(),
            payload=body,
            group_id=group_id, #Same Group as Invite Creation
            priority=1 #Lower priority than Invite Creation
        )

        ndb.put_multi(bulk_notifications)