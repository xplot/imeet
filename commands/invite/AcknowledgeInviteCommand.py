from models import InviteAttendeeNotification
import datetime


class AcknowledgeInviteCommand:

    def __init__(self, attendee_notification_id, attending):
        self.attendee_notification_id = attendee_notification_id
        self.attending = attending

    def execute(self):
        attendeeNotification = InviteAttendeeNotification.get_by_unique_id(self.attendee_notification_id)
        attendeeNotification.web_response = self.attending
        attendeeNotification.web_response_datetime = datetime.datetime.now()
        attendeeNotification.put()