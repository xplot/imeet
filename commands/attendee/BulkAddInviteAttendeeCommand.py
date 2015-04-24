from managers.utils import guid
from models import InviteAttendee, InviteAttendeeNotification, Contact, Invite
from google.appengine.ext import ndb
from .AddInviteAttendeeCommand import AddInviteAttendeeCommand


class BulkAddInviteAttendeeCommand(object):
    def __init__(self, invite_unique_id, invite_attendee_commands):
        self.commands = invite_attendee_commands
        self.invite_unique_id = invite_unique_id

    @classmethod
    def read_from_dict(cls, invite_unique_id, data_dict):
        commands = []
        for x in data_dict:
            commands.append(
                AddInviteAttendeeCommand(
                    invite_unique_id=invite_unique_id,
                    contact_unique_id=x.get('unique_id', None),
                    name=x.get('name'),
                    email=x.get('email', None),
                    phone=x.get('phone', None)
                )
            )
        return BulkAddInviteAttendeeCommand(invite_unique_id, commands)

    def execute(self):
        invite = Invite.get_by_unique_id(self.invite_unique_id)

        bulk_add = []
        for command in self.commands:
            invite_attendee = InviteAttendee(
                unique_id=guid(),
                name=command.name,
                email=command.email,
                phone=command.phone
            )
            if command.contact_unique_id:
                contact = Contact.get_by_unique_id(
                    command.contact_unique_id
                )
                if contact:
                    invite_attendee.contact = contact.key

            invite_attendee.invite = invite.key
            bulk_add.append(invite_attendee)

        ndb.put_multi(bulk_add)