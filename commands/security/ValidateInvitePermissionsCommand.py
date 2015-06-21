from datetime import datetime, timedelta
from google.appengine.ext import ndb

from models.models import SessionToken, Invite, InviteAttendee, InvitePermission
from managers.utils import guid


class ValidateInvitePermissionsCommand(object):

    def __init__(self, invite, current_user=None, invite_attendee_id=None, permissions=[]):
        self.invite = invite
        self.current_user = current_user
        self.invite_attendee_id = invite_attendee_id
        self.permissions = permissions


    def execute(self):
        """
            This command will check what would be the allowance of the current_user
            on the given invite.
            1 - Invite was sent anonymous. Allow all
            2 - Invite Permission == User, will be allowed if current_user not None
            3 - Invite Permission == Attendee, will be allowed if current_user is attendee on the invite
            4 - Invite Permission == Organizer, will be allowed if current_user is Organizer on the invite

        """
        if not self.invite:
            return False

        if not self.invite.user:
            # The invite was sent anonymous, anyone with the id can touch it
            return True
        if not self.permissions:
            return True

        if InvitePermission.Anonymous in self.permissions:
            # Anyone can do anything on this specific request
            return True

        if InvitePermission.User in self.permissions:
            # Any Logged User can do stuff here
            return self.current_user is not None

        if InvitePermission.Attendee in self.permissions:
            # First we try and load the InviteAttendee using
            # the provided invite_attendee_id
            if self.invite_attendee_id:
                invite_attendee = InviteAttendee.get_by_invite_and_user_id(
                    invite=invite,
                    invite_attendee_id=self.invite_attendee_id
                )
                if invite_attendee:
                    return True
            if self.current_user:
                invite_attendee = InviteAttendee.get_by_invite_and_user_id(
                    invite=invite,
                    user=self.current_user
                )
                if invite_attendee:
                    return True
            return False

        if InvitePermission.Organizer in self.permissions:
            if self.current_user:
                return self.invite.user == current_user.key

        return False