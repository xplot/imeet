from datetime import datetime, timedelta
from google.appengine.ext import ndb

from models import SessionToken, User, SessionStatus
from managers.utils import guid

DEFAULT_EXPIRATION_TIME = timedelta(minutes=2)


class CreateSessionTokenCommand(object):

    def __init__(self, user_unique_id=None, user=None, expires_on=datetime.now() + DEFAULT_EXPIRATION_TIME):
        self.user = user
        self.user_unique_id = user_unique_id
        self.expires_on = expires_on

    def execute(self):
        if not self.user:
            self.user = User.get_by_unique_id(self.user_unique_id)

        token = self.get_alive_token()

        if not token:
            # Make sure we only have one token active at a time
            self.expire_all_user_tokens()
            token = self.create_alive_token()

        return token.unique_id

    def get_alive_token(self):
        token = SessionToken.query(ndb.AND(
            SessionToken.user == self.user.key,
            SessionToken.status == SessionStatus.ACTIVE
        )).get()
        if not token or token.expires_on < datetime.now():
            return None
        return token

    def create_alive_token(self):
        session_token = SessionToken(
            user=self.user.key,
            expires_on=self.expires_on,
            status=SessionStatus.ACTIVE
        )
        session_token.put()
        return session_token

    def expire_all_user_tokens(self):
        user_tokens = SessionToken.all_user_tokens(self.user)

        for x in user_tokens:
            x.key.delete()