from managers.utils import guid
from models import InviteAttendee, InviteAttendeeNotification, Contact

class NotifyAttendeesCommand(object):
    def __init__(self, attendees_unique_ids=[]):
        self.attendees_unique_ids = attendees_unique_ids

    @classmethod
    def read_from_dict(cls, data_dict):
        return NotifyAttendeesCommand(
            attendees_unique_ids=data_dict.get('attendees_unique_ids', [])
        )

    def execute(self):
        invite_attendee = InviteAttendee.get_by_unique_id(
            self.attendee_unique_id
        )
        invite_attendee.key.delete()