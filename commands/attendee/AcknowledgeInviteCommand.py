from models import InviteAttendeeNotification
import datetime


class AcknowledgeInviteCommand:
    '''Acknowledges the invite.'''

    def __init__(self, attendee_id, channel, attending):
        self.attendee_id = attendee_id
        self.channel = channel
        self.attending = attending

    def execute(self):
        attendee = InviteAttendee.get_by_unique_id(self.attendee_id)
        if attendee.acknowledges is None:
            attendee.acknowledges = []

        ack = InviteAttendeeAcknowledge()
        ack.response = self.attending
        ack.respondedOn = datetime.datetime.now()
        ack.channel = self.channel
        attendee.acknowledges.append(ack)
        attendee.put()
