from datetime import datetime, timedelta
from google.appengine.ext import ndb

from entities import SessionToken, UserAccount, SessionStatus
from lib.utils import guid


class ValidateSessionTokenCommand(object):

    def __init__(self, session_token):
        self.session_token = session_token

    def execute(self):
        """
            Will check validity of a token according to:
            1 - token.status
            2 - token.expiration_date
        """

        if not self.session_token:
            return False

        session_token_entity = SessionToken.get_by_unique_id(self.session_token)

        if not session_token_entity:
            return False
        if session_token_entity.expires_on <= datetime.now():
            return False
        if session_token_entity.status != SessionStatus.ACTIVE:
            return False
        return True