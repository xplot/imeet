from models import InviteAttendee, InviteAttendeeAcknowledge, AttendeeStatus
from managers.utils import guid
import datetime


class AcknowledgeInviteCommand:
    """Acknowledges the invite."""

    def __init__(self, invite_attendee_id, channel, attending):
        self.invite_attendee_id = invite_attendee_id
        self.channel = channel
        self.attending = attending

    def execute(self):
        attendee = InviteAttendee.get_by_unique_id(self.invite_attendee_id)

        ack = InviteAttendeeAcknowledge()
        ack.response = self.attending
        ack.responded_on = datetime.datetime.now()
        ack.channel = self.channel
        ack.attendee = attendee.key
        ack.invite = attendee.invite

        if 'yes' in self.attending.lower():
            attendee.attendee_status = AttendeeStatus.YES
        elif 'no' in self.attending.lower():
            attendee.attendee_status = AttendeeStatus.NO

        attendee.last_response_on = datetime.datetime.now()
        ack.put()
        attendee.put()


