from models import InviteAttendee, Invite, InviteAttendeeNotification
from query.invite import InviteNotFoundException
from query.attendee.InviteAttendeeReportQuery import InviteAttendeeReportQuery
from query.attendee.InviteAttendeeQuery import InviteAttendeeQuery


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
                'invite_attendee_id':  '',
                'name': u'',
                'phone':
                'email': '',
                'status': '',
                'response_on':'',
                'notified': True|False
            }
        ]
        """
        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)

        if not self.invite:
            raise InviteNotFoundException()

        invite_attendee_notifications = InviteAttendeeNotification.get_by_invite(
            self.invite
        )

        result = []
        for invite_attendee in self.invite.get_attendees():
            invite_attendee_query = InviteAttendeeQuery(invite_attendee).query()
            invite_attendee_query['notified'] = self._is_notified(
                invite_attendee,
                invite_attendee_notifications
            )
            result.append(invite_attendee_query)

        return result

    def _is_notified(self, invite_attendee, invite_attendee_notifications):
        for notification in invite_attendee_notifications:
            if notification.attendee == invite_attendee.key:
                return True
        return False