import jinja2
import os,sys
import webapp2

from webapp2 import Route
from webapp2_extras.routes import RedirectRoute

import logging
logging.info(os.path.join(os.path.dirname(__file__), "emails"))

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(
        [os.path.dirname(__file__),
         os.path.join(os.path.dirname(__file__), "emails")]),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

from handlers import base, invite, profile
from config import config


app = webapp2.WSGIApplication([
    Route('/', base.MainHandler, name='home'),

    Route('/new', base.MainHandler),
    Route('/new/<invite_name>', base.MainHandler),
    Route('/new/from/<source_invite_id>', base.MainHandler),
    Route('/new/<invite_name>/from/<source_invite_id>', base.MainHandler),
    Route('/search', base.MainHandler, handler_method='search', ),
    Route('/view', base.MainHandler, handler_method='view'),
    Route('/view/<id>', base.MainHandler, handler_method='view_invite'),
    Route('/sent/<id>', base.MainHandler, handler_method='view_invite'),

    #User Profile
    Route('/register', base.MainHandler, name='register'),
    Route('/register/email/<email>', profile.RegisterHandler, handler_method='register_email'),
    RedirectRoute('/activate/<user_id>/<token>', profile.AccountActivationHandler, name='account-activation', strict_slash=True),

    Route('/login', profile.LoginHandler, name='login'),
    Route('/logout', profile.LogoutHandler, name='logout'),
    Route('/profile/edit', base.MainHandler, name='edit-profile'),
    Route('/api/profile/<user_id>', profile.UserProfileHandler, name='get-profile'),

    RedirectRoute('/social_login/<provider_name>', profile.SocialLoginHandler, name='social-login', strict_slash=True),
    RedirectRoute('/social_login/<provider_name>/complete', profile.CallbackSocialLoginHandler, name='social-login-complete', strict_slash=True),
    RedirectRoute('/social_login/<provider_name>/delete', profile.DeleteSocialProviderHandler, name='delete-social-provider', strict_slash=True),


    RedirectRoute('/taskqueue-send-email/', base.SendEmailHandler, name='taskqueue-send-email', strict_slash=True),

    #Contact
    Route('/contact_form', base.EmailHandler, name='contact',
          handler_method='send', methods=['POST']),

    #Invite
    Route('/api/invite', invite.InviteHandler, name='send',
          handler_method='send', methods=['POST']),
    Route('/api/invite/post', invite.InviteHandler, name='post_to_voiceflows',
          handler_method='post_to_voiceflows', methods=['POST']),
    Route('/api/invite/search/<user_id>', invite.InviteHandler, name='search',
          handler_method='search'),

    Route('/api/invite/<id>', invite.InviteHandler, name='view',
          handler_method='view', methods=['GET']),
    Route('/api/<invite_id>/contact/<contact_id>/response', invite.InviteHandler, name='accept_response',
          handler_method='accept_response', methods=['POST']),

], config=config,debug=True)
