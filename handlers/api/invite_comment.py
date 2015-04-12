import json
from datetime import datetime
from base import JsonHandler
from config import config
from google.appengine.ext import ndb
#from managers.invite import InviteMapper, InviteModel
from boilerplate.models import User
from managers.auth import user_context


class InviteCommentHandler(JsonHandler):

    def get(self, invite_id):
        invite_model = InviteModel.create_from_id(invite_id)
        return invite_model.get_comments()

    @user_context
    def post(self, invite_id):
        data = self._data()

        if self.user is not None:
            data['author'] = self.user.fullname()

        invite_model = InviteModel.create_from_id(invite_id)
        invite_model.add_comment(data['author'], data['comment'])

        return {
            'author': data['author'],
            'comment': data['comment']
        }