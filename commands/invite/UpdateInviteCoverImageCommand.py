from managers.utils import copy_over, guid
from models import Invite, Image


class UpdateInviteCoverImageCommand(object):
    def __init__(self, unique_id, image_key):
        self.unique_id = unique_id
        self.image_key = image_key

    def execute(self):
        image = Image()
        image.image_key = self.image_key
        image.put()

        invite = Invite.get_by_unique_id(self.unique_id)
        invite.poster_picture = image.key
        invite.put()
        return invite.poster_picture.urlsafe()