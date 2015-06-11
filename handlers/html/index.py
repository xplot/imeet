import json
import logging

import webapp2
from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import RequestHandler

import boilerplate
from main import JINJA_ENVIRONMENT
from boilerplate.basehandler import BaseHandler
import query
from models import Invite
from handlers.api import ImageUploadHandler
from datetime import datetime


class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)


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

    def view_invite(self, invite_id, invite_attendee_id=0):
        if not id:
            return self.redirect_to('home')

        import logging

        invite_query = query.CompleteInviteQuery(invite_id)

        invite_attendee = None

        if invite_attendee_id:
            invite_attendee = query.InviteAttendeeReportQuery(
                invite_attendee_id=invite_attendee_id
            ).query()
        elif self.user:
            invite_attendee = query.InviteAttendeeByUserQuery(
                invite_id=invite_id,
                user=self.current_user
            ).query()

        return self.render_template(
            'invite.html',
            invite=json.dumps(invite_query.query(), cls=DateTimeEncoder),
            invite_attendee=json.dumps(invite_attendee, cls=DateTimeEncoder),
        )

    def edit_invite_view(self, invite_id=0):
        """Get the full invite, with contacts and responses"""
        if not invite_id:
            return self.redirect_to('home')

        invite_query = query.CompleteInviteQuery(invite_id)

        organizer_attendee = query.InviteOrganizerQuery(
            invite_unique_id=invite_id
        ).query()

        #Here is where the Public/Private Invite also has to go
        if organizer_attendee['user_id'] and organizer_attendee['user_id'] != self.user_key.id():
            return self.redirect_to('view_invite', invite_id=invite_id)

        return self.render_template(
            'invite.html',
            edit='True',
            invite=json.dumps(invite_query.query(), cls=DateTimeEncoder),
            invite_attendee=json.dumps(organizer_attendee, cls=DateTimeEncoder),
        )

    def view_invite_template(self, invite_id, invite_attendee_id=None):
        invite_query = query.CompleteInviteQuery(invite_id)

        # invite_attendee = query.InviteAttendeeReportQuery(
        #         invite_attendee_id=invite_attendee_id
        #     ).query()

        invite_attendee = None

        return self.render_template(
            'invite_email.html',
            invite=invite_query.query(),
            invite_attendee=invite_attendee,
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