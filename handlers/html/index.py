import json
import logging

import webapp2
from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import RequestHandler

import boilerplate
from main import JINJA_ENVIRONMENT
from boilerplate.basehandler import BaseHandler
from managers.invite import InviteModel, InviteMapper, InviteUserRole
from models import Invite
from handlers.api import ImageUploadHandler

class IndexHandler(BaseHandler):

    def default_method(self):
        return self.render_template('index.html')

    def get(self, invite_name=None, source_invite_id=None):
        return self.render_template('index_3.0.html')

    def new(self, invite_name=None, source_invite_id=None):
        return self.render_template(
            'index.html',
            location_enabled=True
        )

    def search(self):
        return self.render_template('index.html')

    def view_invite(self, id, contact_id=0):
        if not id:
            return self.redirect_to('home')
        return self.render_template('index.html')

    def edit_invite_view(self, id=0):
        """Get the full invite, with contacts and responses"""
        if not id:
            return self.redirect_to('home')

        invite_model = self._get_invite_model(id)

        if invite_model.get_user_role_by_id(self.user_id) != InviteUserRole.ORGANIZER:
            return self.redirect('/')

        return self.render_template(
            'invite.html',
            invite=json.dumps(InviteMapper.invite_to_dict_with_contact_responses(invite_model))
        )

    def blank(self):
        return self.render_template('blank.html')

    def _get_invite_model(self, invite_id):
        """
            Get the invite by id
            TODO: Think about the location of this function.
        """
        invite_entity = Invite.get_by_unique_id(invite_id)

        if invite_entity is None:
            raise Exception("Invite not found with id: %s" % invite_id)

        return InviteModel(invite_entity)