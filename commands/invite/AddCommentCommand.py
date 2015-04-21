from models import Invite, Comment
import datetime


class AddCommentCommand:

    def __init__(self, invite_id, author, comment):
        self.invite_id = invite_id
        self.author = author
        self.comment = comment

    def execute(self):
        invite = Invite.get_by_unique_id(self.invite_id)

        if invite.comments is None:
            invite.comment = []

        comment = Comment()
        comment.author = self.author
        comment.comment = self.comment
        comment.commentedOn = datetime.datetime.now()
        invite.comments.append(comment)
        invite.put()