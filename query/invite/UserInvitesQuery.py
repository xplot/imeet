from google.appengine.api import search, taskqueue
from google.appengine.ext import ndb
from models import Invite, InviteAttendee
from managers.utils import copy_over, guid, convert_to_user_date

class UserInvitesQuery(object):

    def __init__(self, user, search_term=None):
        self.user = user
        self.search_term = search_term

        if not user:
            raise Exception("Please provide a valid user")

    def query(self):
        """
            Returns a list of invites from the user
            1 - Can be filtered by search_term
            2 - Will be ordered according to date Descending
        """
        result = []

        invite_attendees_group = self.get_invites_grouped_by_attendee()
        if not invite_attendees_group:
            return []

        all_invites = Invite.query(
            Invite.key.IN(invite_attendees_group.keys())
        ).order(-Invite.start).fetch()

        result = []
        for invite in all_invites:
            if self.search_term and self.search_term.lower() not in invite.title.lower():
                continue

            invite_attendee = invite_attendees_group[invite.key]

            result.append({
                'unique_id': invite.unique_id,
                'title':     invite.title,
                'start':     convert_to_user_date(
                    invite.start,
                    invite.utc_offset
                ).strftime("%Y-%m-%d %H:%M"),
                'end':       convert_to_user_date(
                    invite.end,
                    invite.utc_offset
                ).strftime("%Y-%m-%d %H:%M") if invite.end is not None else '',
                'poster_image_id': invite.poster_picture.urlsafe() if invite.poster_picture else None,
                'confirmed': 0,
                'organizer': invite.user.id() if invite.user else None,

                'invite_attendee_id': invite_attendee.unique_id,
                'invite_attendee_role': invite_attendee.attendee_status,
                'response_on':  invite_attendee.last_response_on
            })
        return result

    def get_invites_grouped_by_attendee(self):
        invite_attendees = InviteAttendee.query(
            InviteAttendee.user == self.user.key
        ).fetch() or []

        invite_attendees_table = {}
        for x in invite_attendees:
            invite_attendees_table[x.invite] = x

        return invite_attendees_table