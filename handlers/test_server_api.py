import logging

import requests
import hmac
import hashlib
import base64

from datetime import datetime
from base import JsonHandler
from config import config
from managers.template import TemplateModel
from managers.auth import user_context, request_with_subscription
from managers.invite import InviteMapper, InviteModel
from models.models import Invite
import logging


class VoiceflowsAPI(JsonHandler):

    def post_invite(self):
        logging.info(self._data())

    def post_contacts(self):
        logging.info(self._data())