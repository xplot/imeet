from models import InviteAttendee, Invite, InviteAttendeeNotification
from query.invite import InviteNotFoundException


class NotifyAttendeeQuery(object):

    def __init__(self, invite_attendee):
        self.invite_attendee = invite_attendee

    def query(self):
        """
        Returns a dictionary for the Invite Attendee Notification
        This is a valid data-format:
            {
                'unique_id':'06a014d09264b32b5461d2c849db717',
                'name':"John Smith",
                'email": "xx@xxx.com",
                'phone': '1234567890'
            }
        """
        return {
            'unique_id':  self.invite_attendee.unique_id,
            'name': self.invite_attendee.name,
            'phone': self.invite_attendee.phone,
            'email': self.invite_attendee.email
        }
