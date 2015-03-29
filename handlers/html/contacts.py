import base64
import logging
import uuid
import json
import csv
import StringIO

from managers.auth import user_context
from boilerplate.basehandler import BaseHandler
from google.appengine.ext import ndb
from managers.contact import ContactManager
from models import Contact
from boilerplate.models import User
from managers.group import GroupManager


class ContactHandler(BaseHandler):
    def get(self):
        if self.user is None:
            return self.redirect_to('home')

        group_manager = GroupManager(self.user_key)

        return self.render_template(
            'contacts.html',
            contact_groups=group_manager.get_contacts_sorted_by_group()
        )