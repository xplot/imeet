from managers.utils import guid, copy_over
from models import Contact, InviteAttendee, Invite


class UpdateAttendeeAttachToContactCommand(object):

    def __init__(self, user, invite_id, invite_attendee_id, unique_id=None, name=None, email=None, phone=None):
        if not user:
            raise NoUserException()

        if user:
            self.user = user.key
        else:
            self.user = None

        self.invite_id = invite_id
        self.invite_attendee_id = invite_attendee_id
        self.unique_id = unique_id
        self.name = name
        self.email = email
        self.phone = phone

    def execute(self):
        invite_attendee = None
        if self.invite_attendee_id:
            invite_attendee = InviteAttendee.get_by_unique_id(self.invite_attendee_id)
        else:
            invite_attendee = InviteAttendee(
                unique_id=guid()
            )

        invite_attendee.name = self.name
        invite_attendee.email = self.email
        invite_attendee.phone = self.phone

        contact = None

        if self.user and self.unique_id:
            contact = Contact.get_by_unique_id(
                self.unique_id
            )

        elif self.user:
            contact = Contact(
                unique_id=guid(),
                user=self.user
            )

        # Here we update the contact with the appropiate Data
        if contact:
            invite_attendee.contact = contact.key
            contact.name = self.name
            contact.email = self.email
            contact.phone = self.phone
            contact.put()

        invite = Invite.get_by_unique_id(self.invite_id)
        invite_attendee.invite = invite.key

        invite_attendee.put()
        return invite_attendee.unique_id