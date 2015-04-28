import datetime
from managers.utils import copy_over, guid, convert_to_user_date
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

        def date_compare(x, y):
            if x.commented_on > y.commented_on:
                return -1
            return 1

        return [
            {
                'author':   c.author,
                'comment':  c.comment,
                'on':       convert_to_user_date(
                                c.commented_on,
                                invite.utc_offset
                            ).strftime("%Y-%m-%d %H:%M")
            } for c in sorted(invite.comments, cmp=date_compare)
        ]