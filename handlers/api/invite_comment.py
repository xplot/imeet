from base import JsonHandler
from managers.auth import user_context
import commands
import query


class InviteCommentHandler(JsonHandler):

    def get(self, invite_id):
        q = query.InviteCommentsQuery(invite_id)
        return q.query()

    def post(self, invite_id, invite_attendee_id=None):

        data = self._data()

        add_comment_cmd = commands.AddCommentCommand.read_from_dict(
            invite_id,
            invite_attendee_id,
            data
        )
        add_comment_cmd.execute()
