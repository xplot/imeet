from managers.utils import guid
from models import InviteAttendee, InviteAttendeeNotification, Contact


class RemoveAttendeeCommand(object):
    def __init__(self, attendee_unique_id=None):
        self.attendee_unique_id = attendee_unique_id

    @classmethod
    def read_from_dict(cls, data_dict):
        return RemoveAttendeeCommand(
            attendee_unique_id=data_dict.get('unique_id')
        )

    def execute(self):
        invite_attendee = InviteAttendee.get_by_unique_id(
            self.attendee_unique_id
        )
        invite_attendee.key.delete()

        #TODO
        #If this person has AttendeeNotifications
        #It means he has been notified
        #It has to be notified that he's no longer on the invite
