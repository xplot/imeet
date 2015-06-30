from commands import GmailLoginCommand, FacebookLoginCommand
from boilerplate.basehandler import BaseHandler

class SocialLoginHandler2(BaseHandler):
    """
    Handler for authentication
    """

    def get(self):
        """ Returns a simple HTML form for login """
        return self.render_template('index.html')

    def social_login(self, provider):
        if provider == 'google':
            return self.google_social_login()
        if provider == 'facebook':
            return self.facebook_social_login()

    def google_social_login(self):
        command = GmailLoginCommand(host_url=self.host_url)
        return self.redirect(command.auth_url())

    def facebook_social_login(self):
        command = FacebookLoginCommand(host_url=self.host_url)
        return self.redirect(command.auth_url())

    def google_social_login_callback(self):
        code = self.request.get('code', None)
        error = self.request.get('error', None)

        if error:
            message = (
                "An Error happened while "
                "trying to authenticate using Google"
            )
            self.add_message(message, 'danger')
            return self.redirect_to('login')

        self.authenticate_user(GmailLoginCommand(
            host_url=self.host_url,
            callback_code=code
        ))

    def facebook_social_login_callback(self):
        code = self.request.get('code', None)
        error = self.request.get('error', None)

        if error:
            message = (
                "An Error happened while "
                "trying to authenticate using Google"
            )
            self.add_message(message, 'danger')
            return self.redirect_to('login')

        self.authenticate_user(FacebookLoginCommand(
            host_url=self.host_url,
            callback_code=code
        ))


    def authenticate_user(self, command):
        try:
            user = command.process_callback()
            self.auth.set_session(
                self.auth.store.user_to_dict(user),
                remember=True
            )
            return self.redirect_to('home')
        except Exception, ex:
            self.add_message(ex.message, 'danger')
            return self.redirect_to('login')
