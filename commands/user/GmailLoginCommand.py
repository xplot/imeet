import logging
from config import config
import httplib2

from apiclient import discovery
from oauth2client.client import OAuth2WebServerFlow
from oauth2client.client import OAuth2Credentials
from apiclient.discovery import build
from boilerplate.models import User, SocialUser
from google.appengine.api import users


class GmailLoginCommand(object):

    def __init__(self, host_url=None, callback_code=None):
        self.host_url = host_url
        self.callback_code = callback_code
        self.credentials = None

    def _callback_url(self):
        return self.host_url + "/login/google/callback"

    def auth_url(self):
        """" Will Start Gmail Login """
        redirect_url = self._callback_url()

        flow = OAuth2WebServerFlow(
            client_id=config.get('google_client_id'),
            client_secret=config.get('google_client_secret'),
            scope=config.get('google_client_scope'),
            redirect_uri=redirect_url,
            state={} # Here you can include extra parameters to be returned in callback
        )
        auth_url = flow.step1_get_authorize_url()
        return auth_url

    def process_callback(self):
        """"
        Will Finish Gmail Login
        1 - Capture Token
        2 - Create User if necessary
        3 - Login user
        """
        user_info = self.get_user_info()
        provider_id = user_info['id']

        social_user = SocialUser.get_by_provider_and_uid('google', provider_id)
        if social_user:
            user = social_user.user.get()
        else:
            user = self.create_user(user_info)
            self.create_social_user(user, user_info)

        return user

    @classmethod
    def create_user(cls, provider_user_info):
        auth_id = "google:%s" % provider_user_info['id']
        unique_properties = ['email']

        user_result = User.create_user(
            auth_id,
            unique_properties,
            email=provider_user_info['email'],
            name=provider_user_info['given_name'],
            last_name=provider_user_info['family_name'],
            picture=provider_user_info['picture'],
            activated=True
        )

        if not user_result[0]:
            raise Exception(
                "Email exists already. "
                "Have you logged in already with Facebook perhaps?"
            )

        return user_result[1]

    @classmethod
    def create_social_user(cls, user, provider_user_info):
        social_user = SocialUser(
            user=user.key,
            provider='google',
            uid=provider_user_info['id']
        )

        social_user.put()

    def get_credentials(self):

        flow = OAuth2WebServerFlow(
            client_id=config.get('google_client_id'),
            client_secret=config.get('google_client_secret'),
            scope=config.get('google_client_scope'),
            redirect_uri=self._callback_url(),
        )

        credentials = flow.step2_exchange(self.callback_code)
        return credentials

    def get_user_info(self):

        if not self.credentials:
            self.credentials = self.get_credentials()

        user_info_service = discovery.build(
            serviceName='oauth2',
            version='v2',
            http=self.credentials.authorize(httplib2.Http())
        )
        user_info = user_info_service.userinfo().get().execute()
        return user_info
