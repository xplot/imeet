from base import JsonHandler
from managers.auth import user_context
import commands
import query


class InviteCommentHandler(JsonHandler):

    def get(self, invite_id):
        q = query.InviteCommentsQuery(invite_id)
        return q.query()

    def post(self, invite_id, invite_attendee_id=None):
        return commands.AddCommentCommand.read_from_dict(
            invite_id,
            invite_attendee_id,
            self._data()
        ).execute().unique_id
