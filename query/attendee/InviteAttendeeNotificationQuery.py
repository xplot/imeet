from models import InviteAttendee, Invite, InviteAttendeeNotification
from query.invite import InviteNotFoundException


class InviteAttendeeNotificationQuery(object):

    def __init__(self, invite_attendee_notification):
        self.invite_attendee_notification = invite_attendee_notification

    def query(self):
        """
        Returns a dictionary for the Invite Attendee Notification
        This is a valid data-format:
            {
                'unique_id':  '',
                'name': u'',
                'phone': '',
                'email': 'javi@javi.com',
                'sms_response': '',
                'voice_response': '',
                'email_response': '',
            }
        """
        return {
            'unique_id':  self.invite_attendee_notification.unique_id,
            'name': self.invite_attendee_notification.name,
            'phone': self.invite_attendee_notification.phone,
            'email': self.invite_attendee_notification.email,
            'sms_response': self.invite_attendee_notification.sms_response,
            'voice_response': self.invite_attendee_notification.voice_response,
            'email_response': self.invite_attendee_notification.email_response

        }
