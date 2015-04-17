from managers.utils import copy_over, guid
from models import Invite, Image
from commands.invite.utils import index_invite
from commands.invite import CreateInviteCommand

class UpdateInviteCommand(CreateInviteCommand):
    def __init__(self):
        super(UpdateInviteCommand, self).__init__()
        self.unique_id = None

    @classmethod
    def read_from_dict(cls, unique_id, data_dict):
        """
            Will rely on the CreateInvite Read
        """
        command_source = CreateInviteCommand.read_from_dict(data_dict)
        command_destiny = UpdateInviteCommand()
        command_destiny.unique_id = unique_id
        copy_over(command_source, command_destiny)
        return command_destiny

    def execute(self):
        invite = Invite.get_by_unique_id(self.unique_id)
        copy_over(self, invite)
        invite.put()
        index_invite(invite)
        return invite.unique_id