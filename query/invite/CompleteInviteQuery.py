import datetime
import json
from managers.utils import copy_over, guid, convert_to_user_date
from managers.template import TemplateModel
from models import Invite
import query


class CompleteInviteQuery(object):

    def __init__(self, invite_unique_id=None, invite=None):
        self.invite_unique_id = invite_unique_id
        if invite:
            self.invite_unique_id = invite.unique_id
        self.invite = invite

    def query(self):
        """
        Returns a full fledge invite in a dictionary form
        It also contains attendees and responses from attendees
        {
            'invite_unique_id
            'attendees': [
                {
                    'phone': '',
                    'email': 'javi@javi.com',
                    'name': u'',
                    'status': '',
                    'last_response_on': '',
                    'notified': True|False
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
            },
            palette: {
                name: '',
                main_color: #FFF,
                main_bg_color: #000
            }
            'user_id': u'5302669702856704' #Not mandatory, could be anonymous
        }
        """
        if not self.invite:
            self.invite = Invite.get_by_unique_id(self.invite_unique_id)
        invite = self.invite

        if not invite:
            raise query.InviteNotFoundException()

        result = {
            'unique_id':    invite.unique_id,
            'title':        invite.title,
            'start':        convert_to_user_date(
                invite.start,
                invite.utc_offset
            ).strftime("%Y-%m-%d %H:%M"),
            'end':          convert_to_user_date(
                invite.end,
                invite.utc_offset
            ).strftime("%Y-%m-%d %H:%M") if invite.end is not None else '',
            'description':  invite.description,
            'where':        invite.where,
            'poster_image_id': invite.poster_picture.urlsafe() if invite.poster_picture else None,
            'palette': query.PaletteQuery(palette=invite.palette.get()).query() if invite.palette else None
            #'user_id':      None if not invite.user else invite.user.get().id()
        }

        if invite.comments is None:
            invite.comments = []

        invite_attendees = query.InviteAttendeesQuery(
            invite_unique_id=self.invite_unique_id
        )
        invite_comments = query.InviteCommentsQuery(
            invite_unique_id=self.invite_unique_id
        )

        result.update({
            'attendees':  invite_attendees.query(),
            'comments':   invite_comments.query()
        })

        return result