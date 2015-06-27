from managers.utils import guid
from models import InviteAttendee
from google.appengine.ext import ndb


class UpdateUserOnAttendeesCommand(object):

    def __init__(self, user):
        self.user = user
        self.email = None
        self.phone = phone

    def execute(self):

        query = None
        if user.email:
            query = InviteAttendee.query(
                InviteAttendee.email == email
            )

        attendees = query.fetch()

        # Eventually filter here also by phone

        puts = []

        for attendee in attendees:
            if not attendee.user:
                self.update_user_on_attendee(self.user, attendee, put=False)
                puts.append(attendee)

        ndb.put_multi(puts)

    @classmethod
    def update_user_on_attendee(cls, user, invite_attendee, put=True):
        invite_attendee.user = user.key
        invite_attendee.name = user.name

        if put:
            invite_attendee.put()