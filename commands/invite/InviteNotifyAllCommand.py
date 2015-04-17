from managers.utils import copy_over, guid
from models import Invite, Image
from commands.invite.utils import index_invite


class InviteNotifyAllCommand(object):
    def __init__(self, invite_unique_id):
        self.invite_unique_id = invite_unique_id

    def execute(self):
        invite = Invite.get_by_unique_id(self.unique_id)
        copy_over(self, invite)
        invite.put()
        index_invite(invite)
        return invite.unique_id

    def get_attendees(self):
        """
            Will get the invite attendees
        """
        return [
            InviteAttendeeModel.create_from_entity(x)
            for x in InviteAttendee.query(
                InviteAttendee.invite == self.key
            ).fetch()
        ]

    def send_async(self):
        """Push the invite send to the async queue"""
        EventQueue.push_event(
            endpoint=config.get('api_url'),
            headers=get_voiceflows_headers(),
            payload=InviteMapper.invite_to_dict(self)
        )