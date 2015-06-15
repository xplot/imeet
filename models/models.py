__author__ = 'javi830810'
import datetime
import json

from datetime import time
from google.appengine.api import memcache
from google.appengine.ext import ndb, db
from google.appengine.ext.blobstore import BlobKey
from boilerplate.models import User
from managers.utils import guid

def data_type_handler(obj):
    if isinstance(obj, datetime.datetime) or isinstance(obj, datetime.date):
        return obj.strftime("%m/%d/%y HH:MM:SS")
    elif isinstance(obj, ndb.IntegerProperty):
        return str(obj) if obj != None else "0"
    elif isinstance(obj, ndb.FloatProperty):
        return str(obj) if obj != None else "0"
    elif isinstance(obj, ndb.Key):
        child = obj.get()
        if child:
            if obj.kind() == "User":
                return ""
        return {"id": obj.id()}
    elif isinstance(obj, ndb.BlobKey):
        return str(obj)
    # elif isinstance(obj, ndb.Blob):
        # return obj
    else:
        return None


class UniqueIDModel(ndb.Model):

    def __init__(self, *args, **kwargs):
        unique_id = None

        if 'unique_id' in kwargs:
            unique_id = kwargs.pop('unique_id')
        if 'id' in kwargs:
            unique_id = kwargs.pop('id')

        if not unique_id:
            unique_id = guid()

        kwargs['id'] = unique_id

        super(UniqueIDModel, self).__init__(*args, **kwargs)

    unique_id = ndb.ComputedProperty(lambda self: str(self.key.id()))

    @classmethod
    def get_by_unique_id(cls, unique_id):
        """Gets a Model by it' unique_id """
        return cls.get_by_id(unique_id)

    @property
    def get_id(self):
        return self.key.id()

    def to_json(self, include=None, exclude=None):
        """JSONifies the model"""
        # setup date serialization

        #gets the model's dict
        model_dict = self.to_dict(include = include, exclude = exclude)
        model_dict.update({"id": self.get_id})
        # dumps json for our dict object
        result = json.dumps(model_dict, default=data_type_handler, indent = 4)
        return result

    @classmethod
    def get_by_unique_id(cls, unique_id):
        if not unique_id:
            return None
        return cls.query(cls.unique_id == unique_id).get()

    @classmethod
    def create_new_with_id(cls):
        return cls(unique_id=guid())


class Contact(UniqueIDModel):
    name = ndb.StringProperty()
    phone = ndb.StringProperty()
    email = ndb.StringProperty()
    user = ndb.KeyProperty(kind=User)

    @classmethod
    def get_by_user_and_unique_id(cls, user, unique_id):
        return cls.query(ndb.AND(
            cls.unique_id == unique_id,
            cls.user == user.key
        )).get()


class Comment(UniqueIDModel):
    author = ndb.StringProperty(required=False)
    comment = ndb.StringProperty(required=True, indexed=False)
    commented_on = ndb.DateTimeProperty(required=True, indexed=False)

class Image(UniqueIDModel):
    image_key = ndb.BlobKeyProperty(required=True, indexed=False)

class Invite(UniqueIDModel):
    start = ndb.DateTimeProperty(required=True, indexed=False)
    end = ndb.DateTimeProperty(indexed=False)
    utc_offset = ndb.IntegerProperty(required=True, default=0)

    title = ndb.StringProperty(required=True,indexed=False)
    description = ndb.StringProperty(required=False, indexed=False)
    user = ndb.KeyProperty(kind=User)
    where = ndb.StringProperty(required=False)
    shared_on_facebook = ndb.BooleanProperty(required=False, indexed=False)
    facebook_post_id = ndb.StringProperty(required=False)
    comments = ndb.StructuredProperty(Comment, repeated=True, indexed=False)
    email_template = ndb.StringProperty(required=False, indexed=False)
    email_response_template = ndb.StringProperty(required=False, indexed=False)
    sms_template = ndb.StringProperty(required=False, indexed=False)
    voice_template = ndb.StringProperty(required=False, indexed=False)
    poster_picture = ndb.KeyProperty(required=False, kind=Image, indexed=False)
    style = ndb.StringProperty(required=False, indexed=False)

    @classmethod
    def get_by_user(cls, user):
        return Invite.query(Invite.user == user.key).fetch()

    def get_attendees(self):
        return InviteAttendee.query(
            ndb.AND(
                InviteAttendee.invite == self.key,
                InviteAttendee.attendee_status != AttendeeStatus.DELETED,
            )

        ).fetch()


class AttendeeStatus(object):
    ORGANIZER = "organizer"
    YES = "yes"
    NO = "no"
    NO_RESPONSE = "no_response"
    MAYBE = "maybe"
    DELETED = "deleted"


class InviteAttendee(UniqueIDModel):
    contact = ndb.KeyProperty(kind=Contact)
    invite = ndb.KeyProperty(kind=Invite)
    is_organizer = ndb.BooleanProperty(default=False)
    name = ndb.StringProperty(indexed=False)
    phone = ndb.StringProperty(indexed=False)
    email = ndb.StringProperty(indexed=True)
    attendee_status = ndb.StringProperty(default=AttendeeStatus.NO_RESPONSE)
    last_response_on = ndb.DateTimeProperty(indexed=False, required=False)
    user = ndb.KeyProperty(kind=User ,required=False)

    def get_notifications(self):
        return InviteAttendeeNotification.query(
            InviteAttendeeNotification.attendee == self.key
        ).fetch()

    def get_acknowledges(self):
        return InviteAttendeeAcknowledge.query(
            InviteAttendeeAcknowledge.attendee == self.key
        ).fetch()


class InviteAttendeeAcknowledge(UniqueIDModel):
    """
        This is meant to be a historic table
        Each record being a response from the attendee
    """
    attendee = ndb.KeyProperty(kind=InviteAttendee, required=True)
    invite = ndb.KeyProperty(kind=Invite, required=True)
    channel = ndb.StringProperty(indexed=False)
    response = ndb.StringProperty(indexed=False)
    responded_on = ndb.DateTimeProperty(indexed=False)


class InviteAttendeeNotification(UniqueIDModel):
    """
        This is meant to be a historic table
        Each record being a 'ping' to a given contact in any of the channels
    """
    attendee = ndb.KeyProperty(kind=InviteAttendee, required=True)
    invite = ndb.KeyProperty(kind=Invite, required=True)
    channel = ndb.StringProperty(indexed=False)
    channel_type = ndb.StringProperty()
    notified_on = ndb.DateTimeProperty(indexed=False)

    def attendee_id(self):
        return self.attendee.key.id()

    @classmethod
    def get_by_invite(cls, invite):
        return InviteAttendeeNotification.query(
            InviteAttendeeNotification.invite == invite.key
        ).fetch()



class InviteIndex(ndb.Model):
    doc_id = ndb.StringProperty()
    title = ndb.StringProperty()
    invite_id = ndb.StringProperty()
    when = ndb.DateTimeProperty()
    language = ndb.StringProperty()

class Subscription(UniqueIDModel):
    name = ndb.StringProperty(required=True)
    price = ndb.FloatProperty(required=True, indexed=False)


class UserSubscription(UniqueIDModel):
    user = ndb.KeyProperty(kind=User, required=True)
    subscription = ndb.StringProperty(required=True, indexed=False)
    started_on = ndb.DateTimeProperty(required=True, indexed=False)
    is_trial = ndb.BooleanProperty(required=True, indexed=False)


class Feature(UniqueIDModel):
    name = ndb.StringProperty(required=True)
    Subscription = ndb.KeyProperty(kind=Subscription,required=True)

class Group(UniqueIDModel):
    name = ndb.StringProperty(required=True)
    user = ndb.KeyProperty(kind=User)

class GroupedContact(UniqueIDModel):
    user = ndb.KeyProperty(kind=User)
    group_unique_id = ndb.StringProperty(required=True)
    contact_unique_id = ndb.StringProperty(required=True)
