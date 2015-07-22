import datetime
from config import config
from managers.utils import copy_over, guid
from managers.template import TemplateModel
from managers.event import EventQueue
from models import Invite, Image, AttendeeStatus
from commands.invite.utils import index_invite
from commands.invite.PostInviteToVoiceflowsCommand import PostInviteToVoiceflowsCommand
from commands.invite.SendConfirmationInviteToOrganizerCommand import SendConfirmationInviteToOrganizerCommand
from commands.attendee.AddInviteAttendeeCommand import AddInviteAttendeeCommand

class CreateInviteCommand(object):

    def __init__(self,
                 title=None,
                 organizer_email=None,
                 start=None,
                 end=None,
                 utc_offset=0,
                 where=None,
                 description=None,
                 share_on_facebook=None,
                 email_template=None,
                 email_response_template=None,
                 sms_template=None,
                 user=None,
                 user_object=None,
    ):
        self.title = title
        self.organizer_email = organizer_email
        self.start = start
        self.end = end
        self.utc_offset = utc_offset
        self.where = where
        self.description = description
        self.share_on_facebook = share_on_facebook
        self.email_template = email_template
        self.email_response_template = email_response_template
        self.sms_template = sms_template
        self.user = user
        self.user_object = user_object

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
            'utc_offset': 240,
            'where': 'Location',
            'title': 'Candle',
            'organizer_email': 'optional@gmail.com',
            'sharing_options':{
                'facebook':True,
            },
        }
        """
        command = CreateInviteCommand(
            title=data_dict.get('title', None),
            description=data_dict.get('description', None),
            where=data_dict.get('where', None),
            share_on_facebook=data_dict.get('facebook_share', None),
            utc_offset=data_dict.get('utc_offset', 0),
            organizer_email=data_dict.get('organizer_email', None)
        )

        email_template_model = TemplateModel()
        command.email_template = email_template_model.get_email_template_url()
        command.email_response_template = email_template_model.get_email_response_url()

        command.start = datetime.datetime.strptime(data_dict['start'], "%m/%d/%Y %I:%M %p") + datetime.timedelta(minutes=command.utc_offset)

        if command.start < datetime.datetime.now():
                raise Exception("Start date cannot be in the past")

        if data_dict.get('end', None):
            command.end = datetime.datetime.strptime(data_dict['end'], "%m/%d/%Y %I:%M %p") + datetime.timedelta(minutes=command.utc_offset)
            if command.end < command.start:
                raise Exception("End date cannot be lower than Start Date")

        if user:
            command.user_object = user
            command.user = user.key

        return command

    def execute(self):
        """
            1 - Will create the invite in database
            2 - Will insert the sender as attendee1
            3 - If is anonymous will send the invite for confirmation to the organizer
            4 - Else will post the invite to Voiceflows
        """

        invite = Invite()
        copy_over(self, invite)
        invite.put()
        index_invite(invite)

        addOrganizerCommand = self._get_organizer_attendee(invite)
        addOrganizerCommand.execute()

        if not self.user_object:
            '''is anonymous'''
            command = SendConfirmationInviteToOrganizerCommand(invite)
            command.execute()
            return invite.unique_id

        command = PostInviteToVoiceflowsCommand(invite)
        command.execute()

        return invite.unique_id

    def _get_organizer_attendee(self, invite):
        name = 'Organizer'
        email = ''

        if self.user_object:
            name = self.user_object.name
            email = self.user_object.email

        return AddInviteAttendeeCommand(
            invite=invite,
            name=name,
            email=email,
            user=self.user_object,
            status=AttendeeStatus.ORGANIZER,
            is_organizer=True
        )