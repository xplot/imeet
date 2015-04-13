from config import config
from managers.utils import copy_over, guid, get_voiceflows_headers
from managers.template import TemplateModel
from managers.event import EventQueue
from commands.invite.utils import index_invite
from query import ReducedInviteQuery


class PostInviteToVoiceflowsCommand(object):

    def __init__(self, invite):
        self.invite = invite

    def execute(self):
        """Push the invite send to the async queue"""
        invite_query = ReducedInviteQuery(invite=self.invite)
        invite_query_dict = invite_query.query()

        #Normalizing the context
        invite_query_dict['invite_unique_id'] = self.invite.unique_id
        invite_query_dict['uniquecall_id'] = guid()

        EventQueue.push_event(
            endpoint=config.get('api_url'),
            headers=get_voiceflows_headers(),
            payload=invite_query.query()
        )

