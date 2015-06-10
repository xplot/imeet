from google.appengine.ext import ndb
from models import InviteAttendee, Invite, InviteAttendeeNotification, AttendeeStatus
from query.invite import InviteNotFoundException


class InviteOrganizerQuery(object):

    def __init__(self, invite=None, invite_unique_id=None):
        self.invite_unique_id = invite_unique_id
        self.invite = invite

    def query(self):
        """
        Returns the invite organizer minimally formatted
        This is a valid data-format:
            {
                'unique_id':  '',
                'name': u'',
                'phone':
                'email': '',
                'status':,
                'is_organizer':,
            }
        """
        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)

        invite_attendee = InviteAttendee.query(
            ndb.AND(
                InviteAttendee.invite == self.invite.key,
                InviteAttendee.is_organizer == True
            )
        ).get()

        if not invite_attendee:
            return None

        attendee = {
            'unique_id':  invite_attendee.unique_id,
            'name': invite_attendee.name,
            'phone': invite_attendee.phone,
            'email': invite_attendee.email,
            'user_id': invite_attendee.user.id() if invite_attendee.user else None,
            'status': AttendeeStatus.ORGANIZER,
            'notifications': [],
            'acknowledges': []
        }

        return attendee
