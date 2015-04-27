from models import InviteAttendee, Invite, InviteAttendeeNotification
from query.invite import InviteNotFoundException


class InviteAttendeeReportQuery(object):

    def __init__(self, invite_attendee_id=None, invite_attendee=None):
        self.invite_attendee_id = invite_attendee_id
        self.invite_attendee = invite_attendee

    def query(self):
        """
        Returns a dictionary for the Invite Attendee Notification
        This is a valid data-format:
            {
                'unique_id':  '',
                'name': u'',
                'phone':
                'email': '',
                'status':,
                'last_response_on':,
                notifications: [
                    {
                        unique_id: '',
                        channel: '',
                        channel_type: '',
                        notified_on: '',
                    }
                ],
                acknowledges: [
                    {
                        unique_id: '',
                        channel: '',
                        channel_type: '',
                        response: '',
                        responded_on: '',
                    }
                ]
            }
        """
        if not self.invite_attendee:
            self.invite_attendee = InviteAttendee.get_by_unique_id(self.invite_attendee_id)

        notifications = self.invite_attendee.get_notifications()
        acknowledges = self.invite_attendee.get_acknowledges()

        attendee = {
            'unique_id':  self.invite_attendee.unique_id,
            'name': self.invite_attendee.name,
            'phone': self.invite_attendee.phone,
            'email': self.invite_attendee.email,
            'status': self.invite_attendee.attendee_status,
            'last_response_on': self.invite_attendee.last_response_on,
            'notifications': [],
            'acknowledges': []
        }

        for x in notifications:
            attendee['notifications'].append({
                'unique_id': x.unique_id,
                'channel': x.channel,
                'channel_type': x.channel_type,
                'notified_on': x.notified_on,
            })

        for x in acknowledges:
            attendee['acknowledges'].append({
                'unique_id': x.unique_id,
                'channel': x.channel,
                'responded_on': x.responded_on,
                'response': x.response,
            })

        return attendee
