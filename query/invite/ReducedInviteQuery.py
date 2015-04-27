import datetime
from managers.utils import copy_over, guid
from managers.template import TemplateModel
from models import Invite
import query


class ReducedInviteQuery(object):

    def __init__(self, invite_unique_id=None, invite=None):
        self.invite_unique_id = invite_unique_id
        if invite:
            self.invite_unique_id = invite.unique_id
        self.invite = invite

    def query(self):
        """
        Returns a partial invite in a dictionary form
        It also contains attendees and responses from attendees
        {
            'unique_id,
            'email_template':{
                'id': 0, #This number represents the TemplateModelId
            },
            'SmsTemplate':{
                'text': "Hello World"
            },
            'start': '2014-10-06 04:01AM',
            'end': '2014-10-06 04:01AM',
            'where': 'Location',
            'title': 'Candle',
            'sharing_options':{
                'facebook':True,
            }
            'user_id': u'5302669702856704' #Not mandatory, could be anonymous
        }
        """
        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)
        invite = self.invite

        email_template_model = TemplateModel()

        return {
            'unique_id':    invite.unique_id,
            'title':        invite.title,
            'start':        invite.start.strftime("%Y-%m-%d %H:%M"),
            'end':          invite.end.strftime("%Y-%m-%d %H:%M") if invite.end is not None else '',
            'description':  invite.description,
            'where':        invite.where,
            'poster_image_id': invite.poster_picture.urlsafe() if invite.poster_picture else None,
            'email_template': {
                'subject': 'You have been invited to {{title}}',
                'url': email_template_model.get_email_template_url(),
                'response_url': email_template_model.get_email_response_url(),
            },
            'response_email_template': {
                'subject': "Thank you {{name}} for your response",
                'url':  email_template_model.get_email_response_url(),
                'redirect_url': email_template_model.get_email_redirect_url(),
            },
            'sms_template':{
                'body': "Hello world" #Not used for now
            },
            #'user_id':      None if not invite.user else invite.user.get().id()
        }