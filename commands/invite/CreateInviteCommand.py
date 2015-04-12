import datetime
from managers.utils import copy_over, guid
from managers.template import TemplateModel
from models import Invite, Image
from commands.invite.utils import index_invite


class CreateInviteCommand(object):

    def __init__(self,
                 title=None,
                 start=None,
                 end=None,
                 where=None,
                 description=None,
                 share_on_facebook=None,
                 email_template=None,
                 email_response_template=None,
                 sms_template=None,
                 user=None
    ):
        self.title = title
        self.start = start
        self.end = end
        self.where = where
        self.description = description
        self.share_on_facebook = share_on_facebook
        self.email_template = email_template
        self.email_response_template = email_response_template
        self.sms_template = sms_template
        self.user = user

    @classmethod
    def read_from_dict(cls, data_dict, user=None):
        """
        This is a valid data-format:
        {
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
        }
        """
        command = CreateInviteCommand(
            title=data_dict.get('title', None),
            description = data_dict.get('description', None),
            where = data_dict.get('where', None),
            share_on_facebook = data_dict.get('facebook_share', None),
            start=datetime.datetime.strptime(data_dict['start'], "%m/%d/%Y %H:%M %p")
        )

        email_template_model = TemplateModel()
        if data_dict.get('email_template', None):
            email_template_model = TemplateModel(data_dict.get('email_template')['id'])
        command.email_template = email_template_model.get_email_template_url()
        command.email_response_template = email_template_model.get_email_response_url()

        #12/09/2014 12:00 AM

        if command.start < datetime.datetime.now():
                raise Exception("Start date cannot be in the past")

        if data_dict.get('end', None):
            command.end = datetime.datetime.strptime(data_dict['end'], "%m/%d/%Y %H:%M %p")
            if command.end < command.start:
                raise Exception("End date cannot be lower than Start Date")

        if user:
            command.user = user.key

        return command

    def execute(self):
        invite = Invite()
        invite.unique_id = guid()
        copy_over(self, invite)
        invite.put()

        index_invite(invite)
        return invite.unique_id


