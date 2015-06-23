from models import InviteAttendee, Invite, InviteAttendeeNotification
from query.invite import InviteNotFoundException


class InviteAttendeeQuery(object):

    def __init__(self, invite_attendee=None, invite_attendee_id=None):
        self.invite_attendee = invite_attendee
        self.invite_attendee_id = invite_attendee_id

    def query(self):
        """
        Returns an Attendee on the Invite containing the parameter user
        """

        if not self.invite_attendee:
            self.invite_attendee = InviteAttendee.get_by_unique_id(self.invite_attendee_id)

        return {
            'unique_id': self.invite_attendee.contact.get().unique_id if self.invite_attendee.contact else '',
            'invite_attendee_id':    self.invite_attendee.unique_id,
            'user': self.invite_attendee.user.urlsafe() if self.invite_attendee.user else None,
            'name':         self.invite_attendee.name,
            'phone':        self.invite_attendee.phone,
            'email':        self.invite_attendee.email,
            'status':       self.invite_attendee.attendee_status,
            'response_on':  self.invite_attendee.last_response_on
        }
