import jinja2
import os,sys
import webapp2

from webapp2 import Route
from webapp2_extras.routes import RedirectRoute

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader([
        os.path.dirname(__file__),
        os.path.join(os.path.dirname(__file__), "emails")
    ]),
)

from handlers import api
from handlers import html
from config import config


app = webapp2.WSGIApplication([

    Route('/', html.IndexHandler, name='home'),

    Route('/_blank', html.IndexHandler, name='blank', handler_method='blank'),

    Route('/new', html.IndexHandler, handler_method='new'),
    Route('/new/<invite_name>', html.IndexHandler, handler_method='new'),
    Route('/new/from/<source_invite_id>', html.IndexHandler, handler_method='new'),
    Route('/new/<invite_name>/from/<source_invite_id>', html.IndexHandler, handler_method='new'),
    Route('/search', html.IndexHandler, handler_method='search'),
    Route('/view', html.IndexHandler, handler_method='view_invite'),
    Route('/view/<id>', html.IndexHandler, handler_method='view_invite'),
    Route('/view/<id>/edit', html.IndexHandler, handler_method='edit_invite_view', methods=['GET']),
    Route('/view/<id>/<contact_id>', html.IndexHandler, handler_method='view_invite'),
    Route('/sent/<id>', html.IndexHandler, handler_method='view_invite'),


    #Contacts
    Route('/contacts', html.ContactHandler),
    Route('/contacts/new', html.ContactHandler),
    Route('/api/contacts', api.ApiContactHandler, handler_method='get', methods=['GET']),
    Route('/api/contacts', api.ApiContactHandler, handler_method='add_contact', methods=['POST']),
    Route('/api/contacts/<user_id>/delete/<unique_id>', api.ApiContactHandler, handler_method='delete_contact', methods=['DELETE']),
    Route('/api/contacts/<unique_id>/edit', api.ApiContactHandler, handler_method='update_contact', methods=['PUT']),
    Route('/api/contacts/csv', api.ApiContactHandler, handler_method='import_csv', methods=['POST']),

    #User Profile
    Route('/register', html.IndexHandler, name='register', handler_method='default_method'),
    Route('/register/email/<email>', api.RegisterHandler, handler_method='register_email'),
    RedirectRoute('/activate/<user_id>/<token>', html.AccountActivationHandler, name='account-activation', strict_slash=True),
    Route('/login', html.LoginHandler, name='login'),
    Route('/logout', html.LogoutHandler, name='logout'),
    Route('/profile/edit', html.IndexHandler, name='edit-profile', handler_method='default_method'),
    Route('/api/profile/<user_id>', api.UserProfileHandler, name='get-profile'),
    RedirectRoute('/social_login/<provider_name>', html.SocialLoginHandler, name='social-login', strict_slash=True),
    RedirectRoute('/social_login/<provider_name>/complete', html.CallbackSocialLoginHandler, name='social-login-complete', strict_slash=True),
    RedirectRoute('/social_login/<provider_name>/delete', html.DeleteSocialProviderHandler, name='delete-social-provider', strict_slash=True),
    RedirectRoute('/social_sharing/facebook', html.SocialSharingHandler, name='social-sharing-facebook', handler_method='facebook', strict_slash=True),

    #Invite
    Route('/api/invite', api.InviteHandler, name='save', handler_method='save', methods=['POST']),
    Route('/api/invite/send', api.InviteHandler, name='send', handler_method='send', methods=['POST']),
    Route('/api/invite/search/<user_id>', api.InviteHandler, name='search', handler_method='search'),
    Route('/api/invite/<id>', api.InviteHandler, name='view', handler_method='view', methods=['GET']),
    Route('/api/<invite_id>/contact/<contact_id>/response', api.InviteHandler, name='accept_response', handler_method='accept_response', methods=['POST']),
    Route('/api/invite/<id>/comment', api.InviteHandler, name='add_comment', handler_method='add_comment', methods=['POST']),
    Route('/api/invite/<id>/comments', api.InviteHandler, name='get_comments', handler_method='get_comments', methods=['GET']),

    #Groups
    Route('/api/group', api.ApiGroupHandler, name='get_groups', handler_method='get', methods=['GET']),
    Route('/api/group/<group_id>', api.ApiGroupHandler, name='get_contacts_in_group', handler_method='get_contacts_in_group', methods=['GET']),
    Route('/api/group/<group_name>', api.ApiGroupHandler, name='add_group', handler_method='add', methods=['POST']),
    Route('/api/group/<group_id>', api.ApiGroupHandler, name='remove_group', handler_method='remove', methods=['DELETE']),
    Route('/api/group/<group_id>/<contact_id>', api.ApiGroupHandler, name='add_contact', handler_method='add_contact_to_group', methods=['POST']),

    Route('/api/contacts/groups', api.ApiGroupHandler, handler_method='get_all_groups_and_contacts', methods=['GET']),

    #Events
    Route('/api/event/process', api.EventCronHandler, handler_method='process_queue', name='process_queue'),

    #Image
    Route('/image/<invite_id>/upload_url', api.ImageUploadUrlHandler),
    Route('/image/<invite_id>/upload', api.ImageUploadHandler),
    Route('/image/<image_id>', api.ImageServeHandler),

], config=config,debug=True)
