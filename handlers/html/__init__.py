from index import IndexHandler
from contacts import ContactHandler
from profile import (
    RegisterBaseHandler,
    LoginHandler,
    LogoutHandler,
    AccountActivationHandler,
    SocialLoginHandler,
    DeleteSocialProviderHandler,
    EmailChangedCompleteHandler,
    CallbackSocialLoginHandler,
    SocialSharingHandler
)
from invite_confirmation import InviteConfirmationHandler
from profile_new import SocialLoginHandler2
from base import SendEmailHandler