from base import JsonHandler
from managers.auth import user_context
import commands


class InviteCommentHandler(JsonHandler):

    def get(self, invite_id):
        return "aaa"
        #invite_model = InviteModel.create_from_id(invite_id)
        #return invite_model.get_comments()

    @user_context
    def post(self, invite_id):
        data = self._data()

        if self.user is not None:
            data['author'] = self.user.fullname()

        add_comment_cmd = commands.AddCommentCommand(invite_id, data['author'], data['comment'])
        add_comment_cmd.execute()

        return {
            'author': data['author'],
            'comment': data['comment']
        }