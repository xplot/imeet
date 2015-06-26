import datetime
from models import Invite, InviteAttendee, Comment
from query.invite import InviteNotFoundException


class AddCommentCommand(object):

    def __init__(self, invite_unique_id, invite_attendee_id, comment):
        self.invite_unique_id = invite_unique_id
        self.invite_attendee_id = invite_attendee_id
        self.comment = comment

    @classmethod
    def read_from_dict(cls, invite_unique_id, invite_attendee_id, data_dict):
        comment = data_dict.get('comment')

        return AddCommentCommand(
            invite_unique_id=invite_unique_id,
            invite_attendee_id=invite_attendee_id,
            comment=comment
        )

    def execute(self):
        invite_attendee = None
        if self.invite_attendee_id:
            invite_attendee = InviteAttendee.get_by_unique_id(
                self.invite_attendee_id
            )

        invite = Invite.get_by_unique_id(self.invite_unique_id)

        if invite is None:
            raise InviteNotFoundException()

        author = None
        if invite_attendee is not None:
            author = invite_attendee.name or invite_attendee.email or invite_attendee.phone

        if invite.comments is None:
            invite.comments = []

        comment = Comment()
        comment.author = author
        comment.comment = self.comment
        comment.commented_on = datetime.datetime.now()
        invite.comments.append(comment)
        invite.put()

        return comment