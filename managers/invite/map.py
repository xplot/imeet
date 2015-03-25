import datetime

from managers.template import TemplateModel
from models.models import Invite, Contact


class InviteMapper(object):

    def get_from_id(self, unique_id):
        """Get the invite by id"""
        invite = Invite.query(Invite.unique_id == unique_id).get()
        if invite is None:
            raise Exception('Invite not found with id: ' + unique_id)
        return self._build(invite)

    @classmethod
    def get_from_dict(cls, data_dict):
        """
        Creates an InviteModel out of the supplied dictionary
        This is a valid data-format:
        {
            'contacts': [
                {
                    'phone': '',
                    'email': 'javi@javi.com',
                    'name': u''
                }
            ],
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

        invite = Invite()
        invite.unique_id = data_dict.get('unique_id', None)
        invite.title = data_dict.get('title', None)
        invite.description = data_dict.get('description', None)
        invite.where = data_dict.get('where', None)
        invite.shared_on_facebook = data_dict.get('facebook_share', None)

        email_template_model = TemplateModel()
        if data_dict.get('email_template', None):
            email_template_model = TemplateModel(data_dict.get('email_template')['id'])
        invite.email_template = email_template_model.get_email_template_url()
        invite.email_response_template = email_template_model.get_email_response_url()

        #12/09/2014 12:00 AM
        invite.start = datetime.datetime.strptime(data_dict['start'], "%m/%d/%Y %H:%M %p")
        if invite.start < datetime.datetime.now():
                raise Exception("Start date cannot be in the past")
        if data_dict.get('end', None):
            invite.end = datetime.datetime.strptime(data_dict['end'], "%m/%d/%Y %H:%M %p")
            if invite.end < invite.start:
                raise Exception("End date cannot be lower than Start Date")

        return invite

    @classmethod
    def get_contacts_from_dict(cls, data_dict):
        """
        Creates a List of contacts from the supplied dictionary
        This is a valid data-format:
        {
            'contacts': [
                {
                    'phone': '',
                    'email': 'javi@javi.com',
                    'name': u''
                }
            ]
        }
        """

        contacts = data_dict.get('contacts', [])
        result = []
        for contact in contacts:
            x = Contact()
            x.email = contact.get('email', None)
            x.phone = contact.get('phone', None)
            x.name = contact.get('name', None)
            result.append(x)
        return result

    @classmethod
    def invite_to_dict_with_contact_responses(cls, invite_model):
        invite = invite_model.invite

        if invite.comments is None:
            invite.comments = []

        invite_contacts = invite_model.get_contacts()
        contacts_invites = {
            x.contact_id:x for x in invite_model.get_contact_invites()
        }

        result = cls.invite_to_dict(invite_model)

        result.update({
            'contacts':     [{
                'unique_id': x.unique_id,
                'name':     x.name,
                'phone':    x.phone,
                'email':   x.email,
                'sms_response': contacts_invites[x.unique_id].sms_response,
                'voice_response': contacts_invites[x.unique_id].voice_response,
                'email_response': contacts_invites[x.unique_id].email_response,
            } for x in invite_contacts],
            'comments':     [{
                'author':   c.author,
                'comment':  c.comment,
                'on':       c.commentedOn.strftime("%Y-%m-%d %H:%M")
            } for c in invite.comments]
        })

        return result

    @classmethod
    def invite_to_dict(cls, invite_model):
        invite = invite_model.invite

        return {
            'invite_id':    invite.unique_id,
            'title':        invite.title,
            'start':        invite.start.strftime("%Y-%m-%d %H:%M"),
            'end':          invite.end.strftime("%Y-%m-%d %H:%M") if invite.end is not None else '',
            'description':  invite.description,
            'where':        invite.where,
        }

    @classmethod
    def contacts_to_dict(cls, contacts):
        return {
            'contacts':     [{
                'unique_id': x.unique_id,
                'name':     x.name,
                'phone':    x.phone,
                'email':   x.email,
            } for x in contacts]
        }


class CommentMapper(object):

    @classmethod
    def comments_to_dict(cls, comments):
        return {
                'comments': [{
                    'author': c.author,
                    'comment': c.comment,
                    'on': c.commentedOn.strftime("%Y-%m-%d %H:%M")
                } for c in comments]
            }