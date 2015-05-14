from managers.utils import guid
from models import InviteAttendee, InviteAttendeeNotification, Contact, Invite


class AddInviteAttendeeCommand(object):
    def __init__(self,
         invite_unique_id=None,
         contact_unique_id=None,
         invite=None,
         name=None,
         email=None,
         phone=None,
         status=None
    ):
        self.invite = invite
        self.invite_unique_id = invite_unique_id
        self.contact_unique_id = contact_unique_id
        self.name = name
        self.email = email
        self.phone = phone
        self.status = status

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
        invite_attendee = InviteAttendee(
            unique_id=guid(),
            name=self.name,
            email=self.email,
            phone=self.phone,
            attendee_status=self.status
        )

        if self.contact_unique_id:
            invite_attendee.contact = Contact.get_by_unique_id(contact_unique_id).key

        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)
        invite_attendee.invite = self.invite.key

        #if invite.user is not None:

        invite_attendee.put()