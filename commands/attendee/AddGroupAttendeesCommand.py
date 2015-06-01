from managers.utils import guid
from models import InviteAttendee, InviteAttendeeNotification, Contact, Invite, GroupedContact
from .BulkAddInviteAttendeeCommand import BulkAddInviteAttendeeCommand
from .AddInviteAttendeeCommand import AddInviteAttendeeCommand
from google.appengine.ext import ndb


class AddGroupAttendeesCommand(object):
    def __init__(self,
                 invite_unique_id,
                 group_unique_id,
                 user
    ):
        self.invite_unique_id = invite_unique_id
        self.group_unique_id = group_unique_id
        self.user = user

    def execute(self):
        """
            This method adds all Contacts in a Group as Attendees to an Invite
            TODO: The way it' implemented it' extremely inefficient
        """

        commands = []

        contacts_in_group = GroupedContact.query(
            ndb.AND(
                GroupedContact.user == self.user.key,
                GroupedContact.group_unique_id == self.group_unique_id
        )).fetch()

        for x in contacts_in_group:
            contact = Contact.get_by_unique_id(x.contact_unique_id)

            commands.append(
                AddInviteAttendeeCommand(
                    invite_unique_id=self.invite_unique_id,
                    contact_unique_id=contact.unique_id,
                    name=contact.name,
                    email=contact.email,
                    phone=contact.phone
                )
            )

        return BulkAddInviteAttendeeCommand(
            self.invite_unique_id,
            commands
        ).execute()



