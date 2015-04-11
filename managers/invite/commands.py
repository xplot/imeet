import datetime
from managers.utils import copy_over, guid
from managers.template import TemplateModel
from models import Invite, Image
from google.appengine.api import search


def index_invite(invite):
    """
    Stores the document in the datastore index
    Search can only be performed word by word
    """
    index = search.Index(name='invite_index')
    inviteSearch = search.Document(
        doc_id=invite.unique_id,
        fields=[
            search.TextField(name='title', value=invite.title),
            search.DateField(name='start', value=invite.start),
        ],
        language='en'
    )
    index.put(inviteSearch)


class CreateInviteCommand(object):

    def __init__(self):
        self.title = None
        self.start = None
        self.end = None
        self.where = None
        self.description = None
        self.share_on_facebook = None
        self.email_template = None
        self.email_response_template = None
        self.sms_template = None
        self.user = None

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
        command = CreateInviteCommand()
        command.title = data_dict.get('title', None)
        command.description = data_dict.get('description', None)
        command.where = data_dict.get('where', None)
        command.shared_on_facebook = data_dict.get('facebook_share', None)

        email_template_model = TemplateModel()
        if data_dict.get('email_template', None):
            email_template_model = TemplateModel(data_dict.get('email_template')['id'])
        command.email_template = email_template_model.get_email_template_url()
        command.email_response_template = email_template_model.get_email_response_url()

        #12/09/2014 12:00 AM
        command.start = datetime.datetime.strptime(data_dict['start'], "%m/%d/%Y %H:%M %p")
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


class UpdateInviteCommand(CreateInviteCommand):
    def __init__(self):
        super(UpdateInviteCommand, self).__init__()
        self.unique_id = None

    @classmethod
    def read_from_dict(cls, unique_id, data_dict):
        """
            Will rely on the CreateInvite Read
        """
        command_source = CreateInviteCommand.read_from_dict(data_dict)
        command_destiny = UpdateInviteCommand()
        command_destiny.unique_id = unique_id
        copy_over(command_source, command_destiny)
        return command_destiny

    def execute(self):
        invite = Invite.get_by_unique_id(self.unique_id)
        copy_over(self, invite)
        invite.put()
        index_invite(invite)
        return invite.unique_id


class UpdateInviteCoverImage(object):
    def __init__(self, unique_id, image_key):
        self.unique_id = unique_id
        self.image_key = image_key

    def execute(self):
        image = Image()
        image.unique_id = guid()
        image.image_key = self.image_key
        image.put()

        invite = Invite.get_by_unique_id(self.unique_id)
        invite.poster_picture = image.key
        invite.put()
        return invite.poster_picture.urlsafe()