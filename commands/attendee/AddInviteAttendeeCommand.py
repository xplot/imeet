from managers.utils import guid
from commands.addressbook.UpdateOrCreateContactCommand import UpdateOrCreateContactCommand
from models import InviteAttendee, InviteAttendeeNotification, Contact, Invite


class AddInviteAttendeeCommand(object):
    def __init__(
        self,
        invite_unique_id=None,
        contact_unique_id=None,
        invite=None,
        name=None,
        email=None,
        phone=None,
        status=None,
        is_organizer=False
    ):
        self.invite = invite
        self.invite_unique_id = invite_unique_id
        self.contact_unique_id = contact_unique_id
        self.name = name
        self.email = email
        self.phone = phone
        self.status = status
        self.is_organizer = is_organizer

    @classmethod
    def read_from_dict(cls, invite_unique_id, data_dict):
        return AddInviteAttendeeCommand(
            invite_unique_id=invite_unique_id,
            contact_unique_id=data_dict.get('contact_unique_id', None),
            name=data_dict.get('name'),
            email=data_dict.get('email', None),
            phone=data_dict.get('phone', None)
        )

    def execute(self):
        invite_attendee = None
        invite_attendee = InviteAttendee(
            unique_id=guid()
        )

        invite_attendee.name = self.name
        invite_attendee.email = self.email
        if self.status:
            invite_attendee.attendee_status = self.status
        invite_attendee.phone = self.phone

        if self.contact_unique_id:
            contact = Contact.get_by_unique_id(
                self.contact_unique_id
            )
            if contact:
                invite_attendee.contact = contact.key

        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)
        invite_attendee.invite = self.invite.key

        invite_attendee.is_organizer = self.is_organizer

        invite_attendee.put()
        return invite_attendee.unique_id