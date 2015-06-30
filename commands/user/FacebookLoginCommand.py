import logging
from config import config
import httplib2

from apiclient import discovery
from boilerplate import facebook
from boilerplate.models import User, SocialUser
from google.appengine.api import users
from datetime import datetime, timedelta

class FacebookLoginCommand(object):

    def __init__(self, host_url=None, callback_code=None):
        self.host_url = host_url
        self.callback_code = callback_code

    def _callback_url(self):
        return self.host_url + "/login/facebook/callback"

    def auth_url(self):
        """" Will Start Facebook Login """
        perms = ['email', 'publish_actions']
        return facebook.auth_url(
            config.get('fb_api_key'),
            self._callback_url(),
            perms
        )

    def process_callback(self):
        """"
        Will Finish Facebook Login
        1 - Capture Token
        2 - Create User if necessary
        3 - Login user
        """

        token = facebook.get_access_token_from_code(
            self.callback_code,
            self._callback_url(),
            config.get('fb_api_key'),
            config.get('fb_secret')
        )

        access_token = token['access_token']
        provider_user_info = self.get_user_info(access_token)
        provider_id = provider_user_info['id']

        social_user = SocialUser.get_by_provider_and_uid('facebook', provider_id)
        if social_user:
            user = social_user.user.get()
        else:
            user = self.create_user(provider_user_info)
            self.create_social_user(user, provider_user_info, access_token)

        return user

    @classmethod
    def create_user(cls, provider_user_info):
        auth_id = "facebook:" + provider_user_info['id']
        unique_properties = ['email']

        user_result = User.create_user(
            auth_id,
            unique_properties,
            email=provider_user_info['email'],
            name=provider_user_info['name'],
            last_name=provider_user_info['last_name'],
            picture=provider_user_info['picture'],
            activated=True
        )

        if not user_result[0]:
            raise Exception(
                "Email exists already. "
                "Have you logged in already with Google perhaps?"
            )

        return user_result[1]

    @classmethod
    def create_social_user(cls, user, provider_user_info, access_token):
        social_user = SocialUser(
            user=user.key,
            provider='facebook',
            uid=provider_user_info['id']
        )

        social_user.extra_data = {
            'access_token': access_token
        }

        time_delta = timedelta(days=7)
        token_expiration_date = datetime.now() + time_delta
        social_user.social_sharing_token_expiration = token_expiration_date

        social_user.put()

    def get_user_info(self, access_token):
        fb = facebook.GraphAPI(access_token)
        user_info = fb.get_object('me')
        user_info['picture'] = 'http://graph.facebook.com/%s/picture?type=large' % user_info['id']
        return user_info
