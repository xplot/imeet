import datetime

from managers.template import TemplateModel
from models import Invite, Contact, InviteAttendeeNotification
from managers.utils import guid

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
    def get_attendees_model_from_dict(cls, invite_model, attendees):
        """
        Creates a List of contacts from the supplied dictionary
        This is a valid data-format:
        [
            {
                'phone': '',
                'email': 'javi@javi.com',
                'name': u''
            }
        ]

        """
        result = []
        for attendee in attendees:
            result.append(
                InviteAttendeeModel.create_from_raw_data(
                    invite_model,
                    contact_unique_id=attendee.get('contact_unique_id', None),
                    name=attendee.get('name', None),
                    email=attendee.get('email', None),
                    phone=attendee.get('phone', None)
                )
            )
        return result

    @classmethod
    def invite_attendee_notifications_to_dict(cls, invite_attendee_notifications):
        """
        Returns a list of Invite Attendee Notifications
        This is a valid data-format:
        [
            {
                'phone': '',
                'email': 'javi@javi.com',
                'name': u'',
                notifications:[
                    {
                        'name': u'',
                        'phone': '',
                        'email': 'javi@javi.com',
                        'sms_response': '',
                        'voice_response': '',
                        'email_response': '',
                    }
                ]
            }
        ]
        """
        result = []
        for x in invite_attendee_notifications:
            notification = {
                'phone': x.phone,
                'email': x.email,
                'sms_response': x.sms_response,
                'voice_response': x.voice_response,
                'email_response': x.email_response,
            }

            if result.get(x.attendee_id):
                result[x.attendee_id]['notifications'].append(notification)
            else:
                invite_attendee = x.attendee.get()
                invite_attendee_contact = invite_attendee.contact.get()
                result[x.attendee_id] = {
                    'name': invite_attendee_contact.name,
                    'notifications': [notification]
                }
        return result

    @classmethod
    def invite_to_dict_with_attendee_responses(cls, invite_model):
        invite = invite_model.invite

        if invite.comments is None:
            invite.comments = []

        invite_notifications = [
            x for x in InviteAttendeeNotification.query(
                InviteAttendeeNotification.invite == invite_model.invite.key
            )
        ]

        result = cls.invite_to_dict(invite_model)

        result.update({
            'contacts':  cls.invite_attendee_notifications_to_dict(
                invite_notifications
            ),
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
            'poster_image_id': invite.poster_picture.urlsafe() if invite.poster_picture else None
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

    @classmethod
    def invite_attendee_notification_to_dict(cls, invite_attendee_notification):
        return {
            'attendee_id':      invite_attendee_notification.unique_id,
            'name':             invite_attendee_notification.name,
            'phone':            invite_attendee_notification.phone,
            'email':            invite_attendee_notification.email,
        }

    @classmethod
    def invite_safe_copy(cls, object_source, object_destiny):
        import logging
        for x in InviteMapper.non_empty_properties(object_source):
            logging.info(x)
            logging.info(getattr(object_source,x))
            setattr(object_destiny, x, getattr(object_source,x))

    @classmethod
    def non_empty_properties(cls, object_source):
        for cls_property in object_source._properties:
            if getattr(object_source,cls_property):
                yield cls_property

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