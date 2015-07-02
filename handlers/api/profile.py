import logging
from boilerplate import models
from boilerplate import utils
from google.appengine.api import taskqueue
from webapp2_extras import security
from webapp2_extras.appengine.auth.models import Unique

from base import JsonHandler


class RegisterHandler(JsonHandler):
    """
    Handler for Sign Up Users
    """

    def register_email(self, email):
        """Sends the activation email out"""

        unique_properties = ['username', 'email']
        auth_id = "own:"+email
        user = models.User.create_user(
            auth_id,
            unique_properties,
            username=email,
            email=email,
            ip=self.request.remote_addr
        )

        if not user[0]:
            message = 'Sorry, Couldnt register the email <strong>%s</strong>' % email
            logging.info(message)
            raise Exception(message)

        subject = "iMeet - Account Verification"
        confirmation_url = self.uri_for(
            "account-activation",
            user_id=user[1].get_id(),
            token=models.User.create_auth_token(
                user[1].get_id()
            ),
            _full=True
        )
        logging.info(confirmation_url)
        # load email's template
        template_val = {
            "app_name": self.app.config.get('app_name'),
            "fullname": email,
            "email": email,
            "activation_url": confirmation_url,
            "support_url": "no_support_url_as_of_yet"
        }
        body_path = "account_activation.html"
        body = self.get_template_rendered(body_path, **template_val)

        #
        email_url = self.uri_for('taskqueue-send-email')
        taskqueue.add(url=email_url, params={
            'to': str(email),
            'subject': subject,
            'body': body,
        })

        return True


class UserProfileHandler(JsonHandler):
    """
    Handler for Edit User Profile
    """

    def get(self, user_id):
        """ Returns the current logged user"""

        user_info = models.User.get_by_id(long(user_id))
        providers_info = user_info.get_social_providers_info()

        return {
            'name': user_info.name,
            'last_name': user_info.last_name,
            'username': user_info.username,
            'password': None,
            'email': user_info.email,
            'local_account': True if user_info.password else False,
            'used_providers': providers_info['used'],
            'unused_providers': providers_info['unused'],
            'country': user_info.country,
            'tz': user_info.tz
        }

    def post(self, user_id):
        """ Get fields from POST dict """

        user_data = self._data()
        user_info = models.User.get_by_id(long(user_id))

        logging.info(user_data)

        if not user_info:
            raise Exception("User not found with id: " + user_id)

        username = user_data['username']
        try:
            message = ''
            # update username if it has changed and it isn't already taken

            user_info.unique_properties = ['username', 'email']
            uniques = [
                'User.username:%s' % username,
                'User.auth_id:own:%s' % username,
            ]
            # Create the unique username and auth_id.
            success, existing = Unique.create_multi(uniques)

            if not existing and not success:
                raise Exception("Error creating user")

            # free old uniques
            Unique.delete_multi(
                ['User.username:%s' % user_info.username, 'User.auth_id:own:%s' % user_info.username])
            # The unique values were created, so we can save the user.
            user_info.username = username
            user_info.auth_ids[0] = 'own:%s' % username
            user_info.name = user_data.get('name', None)
            user_info.last_name = user_data.get('last_name', None)

            if user_data.get('password', None) is not None:
                # Password to SHA512
                password = utils.hashing(user_data['password'], self.app.config.get('salt'))
                user_info.password = security.generate_password_hash(password, length=12)

            user_info.put()
            return True
        except (AttributeError, KeyError, ValueError), e:
            logging.error('Error updating profile: ')
            logging.exception(e)
            return False
