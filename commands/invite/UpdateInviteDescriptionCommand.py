from datetime import datetime

from managers.utils import copy_over, guid
from models import Invite, Image
from commands.invite.utils import index_invite
from commands.invite import CreateInviteCommand
from commands.exceptions import InviteCannotBeEditedException


class UpdateInviteDescriptionCommand(CreateInviteCommand):

    def __init__(self, invite_unique_id, invite_description):
        self.unique_id = invite_unique_id
        self.invite_description = invite_description

    def execute(self):
        invite = Invite.get_by_unique_id(self.unique_id)

        invite.description = self.invite_description
        invite.put()
        index_invite(invite)