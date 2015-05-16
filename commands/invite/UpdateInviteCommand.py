from datetime import datetime, timedelta

from managers.utils import copy_over, guid
from models import Invite, Image
from commands.invite.utils import index_invite
from commands.invite import CreateInviteCommand
from commands.exceptions import InviteCannotBeEditedException


class UpdateInviteCommand(CreateInviteCommand):
    def __init__(self, invite_unique_id):
        super(UpdateInviteCommand, self).__init__()
        self.unique_id = invite_unique_id

    @classmethod
    def read_from_dict(cls, unique_id, data_dict):
        """
            Will almost repeat the CreateInviteCommand Read
        """
        command = UpdateInviteCommand(unique_id)
        command.title = data_dict.get('title', None)
        command.description = data_dict.get('description', None)
        command.where = data_dict.get('where', None)
        command.utc_offset = data_dict.get('utc_offset', 0)

        command.start = datetime.strptime(data_dict['start'], "%m/%d/%Y %I:%M %p") + timedelta(minutes=command.utc_offset)
        if command.start < datetime.now():
                raise Exception("Start date cannot be in the past")

        if data_dict.get('end', None):
            command.end = datetime.strptime(data_dict['end'], "%m/%d/%Y %I:%M %p")
            if command.end < command.start:
                raise Exception("End date cannot be lower than Start Date")

        return command

    def execute(self):
        invite = Invite.get_by_unique_id(self.unique_id)

        if invite.start < datetime.now():
            raise InviteCannotBeEditedException(
                "This invite is in the past it cannot be edited anymore"
            )

        copy_over(self, invite)
        invite.put()
        index_invite(invite)
        return invite.unique_id