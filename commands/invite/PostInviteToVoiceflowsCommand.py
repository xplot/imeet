import datetime
import hmac
import hashlib
import base64
from config import config
from managers.utils import copy_over, guid
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

        EventQueue.push_event(
            endpoint=config.get('api_url'),
            headers=self.get_voiceflows_headers(),
            payload=invite_query.query()
        )

    def get_voiceflows_headers(self):
        now = datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:00 GMT")
        secret = '8\x0c7_\x01\t/{C)6V`\x1c!'
        dig = hmac.new(secret, msg=now, digestmod=hashlib.sha256).digest()
        authToken = "Voiceflows " + base64.b64encode(dig).decode()

        return {
            'Content-type': 'application/json',
            'Accept': 'text/plain',
            'Date': now,
            'Authorization': authToken
        }