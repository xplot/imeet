from models import InviteAttendee, Invite, InviteAttendeeNotification
from query.invite import InviteNotFoundException
from query.attendee.InviteAttendeeReportQuery import InviteAttendeeReportQuery


class InviteAttendeesQuery(object):

    def __init__(self, invite=None,  invite_unique_id=None):
        self.invite = invite
        self.invite_unique_id = invite_unique_id

    def query(self):
        """
        Returns a list of Invite Attendee Notifications
        This is a valid data-format:
        [
            {
                'unique_id':  '',
                'name': u'',
                'phone':
                'email': '',
                'status': '',
                'response_on':''
            }
        ]
        """
        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)

        if not self.invite:
            raise InviteNotFoundException()

        return [
            {
                'unique_id':    x.unique_id,
                'name':         x.name,
                'phone':        x.phone,
                'email':        x.email,
                'status':       x.attendee_status,
                'response_on':  x.last_response_on
            } for x in self.invite.get_attendees()
        ]

