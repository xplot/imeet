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

from handlers import base, invite, profile, contacts, group
from config import config


app = webapp2.WSGIApplication([

    Route('/_blank', base.MainHandler, name='blank', handler_method='blank'),

    Route('/new', base.MainHandler, handler_method='new'),
    Route('/new/<invite_name>', base.MainHandler, handler_method='new'),
    Route('/new/from/<source_invite_id>', base.MainHandler, handler_method='new'),
    Route('/new/<invite_name>/from/<source_invite_id>', base.MainHandler, handler_method='new'),
    Route('/search', base.MainHandler, handler_method='search'),
    Route('/view', base.MainHandler, handler_method='view_invite'),
    Route('/view/<id>', base.MainHandler, handler_method='view_invite'),
    Route('/view/<id>/<contact_id>', base.MainHandler, handler_method='view_invite'),
    Route('/sent/<id>', base.MainHandler, handler_method='view_invite'),
    Route('/', base.MainHandler, name='home'),

    #Contacts
    Route('/contacts', contacts.ContactHandler),
    Route('/contacts/new', contacts.ContactHandler),
    Route('/api/contacts', contacts.ApiContactHandler, handler_method='get', methods=['GET']),
    Route('/api/contacts', contacts.ApiContactHandler, handler_method='add_contact', methods=['POST']),
    Route('/api/contacts/<unique_id>/delete', contacts.ApiContactHandler, handler_method='delete_contact', methods=['DELETE']),
    Route('/api/contacts/<unique_id>/edit', contacts.ApiContactHandler, handler_method='update_contact', methods=['PUT']),
    Route('/api/contacts/csv', contacts.ApiContactHandler, handler_method='import_csv', methods=['POST']),

    #User Profile
    Route('/register', base.MainHandler, name='register', handler_method='default_method'),
    Route('/register/email/<email>', profile.RegisterHandler, handler_method='register_email'),
    RedirectRoute('/activate/<user_id>/<token>', profile.AccountActivationHandler, name='account-activation', strict_slash=True),

    Route('/login', profile.LoginHandler, name='login'),
    Route('/logout', profile.LogoutHandler, name='logout'),
    Route('/profile/edit', base.MainHandler, name='edit-profile', handler_method='default_method'),
    Route('/api/profile/<user_id>', profile.UserProfileHandler, name='get-profile'),

    RedirectRoute('/social_login/<provider_name>', profile.SocialLoginHandler, name='social-login', strict_slash=True),
    RedirectRoute('/social_login/<provider_name>/complete', profile.CallbackSocialLoginHandler, name='social-login-complete', strict_slash=True),
    RedirectRoute('/social_login/<provider_name>/delete', profile.DeleteSocialProviderHandler, name='delete-social-provider', strict_slash=True),

    RedirectRoute('/social_sharing/facebook', profile.SocialSharingHandler, name='social-sharing-facebook', handler_method='facebook', strict_slash=True),

    RedirectRoute('/taskqueue-send-email/', base.SendEmailHandler, name='taskqueue-send-email', strict_slash=True),

    #Contact
    Route('/contact_form', base.EmailHandler, name='contact',
          handler_method='send', methods=['POST']),

    #Invite
    Route('/api/invite', invite.InviteHandler, name='send', handler_method='send', methods=['POST']),
    Route('/api/invite/post', invite.InviteHandler, name='post_to_voiceflows',
          handler_method='post_to_voiceflows', methods=['POST']),
    Route('/api/invite/search/<user_id>', invite.InviteHandler, name='search',
          handler_method='search'),

    Route('/api/invite/<id>', invite.InviteHandler, name='view',
          handler_method='view', methods=['GET']),
    Route('/api/<invite_id>/contact/<contact_id>/response', invite.InviteHandler, name='accept_response',
          handler_method='accept_response', methods=['POST']),
    Route('/api/invite/<id>/comment', invite.InviteHandler, name='add_comment', handler_method='add_comment', methods=['POST']),
    Route('/api/invite/<id>/comments', invite.InviteHandler, name='get_comments', handler_method='get_comments', methods=['GET']),

    #Groups
    Route('/api/group', group.ApiGroupHandler, name='get_groups', handler_method='get', methods=['GET']),
    Route('/api/group/<group_id>', group.ApiGroupHandler, name='get_contacts_in_group', handler_method='get_contacts_in_group', methods=['GET']),
    Route('/api/group/<group_name>', group.ApiGroupHandler, name='add_group', handler_method='add', methods=['POST']),
    Route('/api/group/<group_id>', group.ApiGroupHandler, name='remove_group', handler_method='remove', methods=['DELETE']),
    Route('/api/group/<group_id>/<contact_id>', group.ApiGroupHandler, name='add_contact', handler_method='add_contact_to_group', methods=['POST']),

    Route('/api/contacts/groups', group.ApiGroupHandler, handler_method='get_all_groups_and_contacts', methods=['GET']),

], config=config,debug=True)
