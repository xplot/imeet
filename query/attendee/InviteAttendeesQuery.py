from models import InviteAttendee, Invite
from query.invite import InviteNotFoundException

class InviteAttendeesQuery(object):

    def __init__(self, invite_unique_id):
        self.invite_unique_id = invite_unique_id

    def query(self):
        """
        Returns a list of Invite Attendee Notifications
        This is a valid data-format:
        [
            {
                'phone': '',
                'email': 'javi@javi.com',
                'name': u'',
                notifications:[
                    {
                        'name': u'',
                        'phone': '',
                        'email': 'javi@javi.com',
                        'sms_response': '',
                        'voice_response': '',
                        'email_response': '',
                    }
                ]
            }
        ]
        """
        invite = Invite.get_by_unique_id(self.invite_unique_id)

        if not invite:
            raise InviteNotFoundException()

        result = []
        for x in invite.get_attendees():
            attendee = {
                'phone': x.phone,
                'email': x.email,
                'name': x.name,
                'unique_id': x.unique_id
            }
            result.append(attendee)
        return result

