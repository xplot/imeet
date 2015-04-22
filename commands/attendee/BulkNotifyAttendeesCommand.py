from config import config
from managers.utils import guid, get_voiceflows_headers
from managers.event import EventQueue
from models import Invite, InviteAttendee, InviteAttendeeNotification, Contact
from google.appengine.ext import ndb
from query.attendee.NotifyAttendeeQuery import NotifyAttendeeQuery


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
            self.create_notification_records(invite_attendee)

            body['attendees'].append(NotifyAttendeeQuery(
                invite_attendee
            ).query())

        group_id = EventQueue.get_group_id(self.invite.unique_id)
        EventQueue.push_event(
            endpoint=config.get('api_url') + "/attendees",
            headers=get_voiceflows_headers(),
            payload=body,
            group_id=group_id, #Same Group as Invite Creation
            priority=1 #Lower priority than Invite Creation
        )

        ndb.put_multi(bulk_notifications)

    def create_notification_records(self, invite_attendee):
        if invite_attendee.phone:
            attendee_sms_notification = InviteAttendeeNotification(
                unique_id=guid(),
                invite=self.invite.key,
                attendee=invite_attendee.key,
                channel=invite_attendee.phone,
                channel_type='sms',
                notified_on=datetime.datetime.now
            )

            attendee_voice_notification = InviteAttendeeNotification(
                unique_id=guid(),
                invite=self.invite.key,
                attendee=invite_attendee.key,
                channel=invite_attendee.phone,
                channel_type='phone',
                notified_on=datetime.datetime.now
            )
            bulk_notifications.append(attendee_sms_notification)
            bulk_notifications.append(attendee_voice_notification)

        if invite_attendee.email:
            attendee_email_notification = InviteAttendeeNotification(
                unique_id=guid(),
                invite=self.invite.key,
                attendee=invite_attendee.key,
                channel=invite_attendee.email,
                channel_type='email',
                notified_on=datetime.datetime.now
            )
            bulk_notifications.append(attendee_email_notification)