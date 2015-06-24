from datetime import datetime, timedelta
from google.appengine.ext import ndb

from models import SessionToken, User, SessionStatus
from managers.utils import guid


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
            logging.info("Empty session_token")
            return False

        session_token_entity = SessionToken.get_by_unique_id(self.session_token)

        import logging
        logging.info(session_token_entity)

        if not session_token_entity:
            logging.info("Empty session entity")
            return False
        if session_token_entity.expires_on <= datetime.now():
            logging.info("Expired by time")
            logging.info(session_token_entity.expires_on)
            return False
        if session_token_entity.status != SessionStatus.ACTIVE:
            logging.info("Expired by status")
            logging.info(session_token_entity.status)
            return False
        return True