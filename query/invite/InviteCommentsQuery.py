import datetime
from managers.utils import copy_over, guid
from managers.template import TemplateModel
from models import Invite


class InviteCommentsQuery(object):

    def __init__(self, invite_unique_id):
        self.invite_unique_id = invite_unique_id

    def query(self):
        """
        Returns a list of comments from the invite
        [
            {
                'author':   '',
                'comment':  '',
                'on':       ''
            }
        ]
        """
        invite = Invite.get_by_unique_id(self.invite_unique_id)

        if invite.comments is None:
            invite.comments = []

        return [
            {
                'author':   c.author,
                'comment':  c.comment,
                'on':       c.commentedOn.strftime("%Y-%m-%d %H:%M")
            } for c in invite.comments
        ]