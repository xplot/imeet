from config import config
from managers.utils import copy_over, guid, get_voiceflows_headers
from managers.template import TemplateModel
from managers.event import EventQueue
from commands.invite.utils import index_invite
from query import ReducedInviteQuery


class UpdateInviteInVoiceflowsCommand(object):

    def __init__(self, invite):
        self.invite = invite

    def execute(self):
        """Push the invite send to the async queue"""
        invite_query = ReducedInviteQuery(invite=self.invite)
        invite_query_dict = invite_query.query()

        #Normalizing the context
        invite_query_dict['invite_unique_id'] = self.invite.unique_id
        invite_query_dict['uniquecall_id'] = guid()

        group_id = EventQueue.create_event_group(self.invite.unique_id)
        EventQueue.push_event(
            endpoint=config.get('api_url') + "/update",
            headers=get_voiceflows_headers(),
            payload=invite_query_dict,
            group_id=group_id,
            priority=0
        )

