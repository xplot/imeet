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


class BaseModel(ndb.Model):
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    last_modified = ndb.DateTimeProperty(auto_now=True)

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


class Contact(BaseModel):
    unique_id = ndb.StringProperty(required=True)
    name = ndb.StringProperty()
    phone = ndb.StringProperty()
    email = ndb.StringProperty()
    user = ndb.KeyProperty(kind=User)


class Comment(BaseModel):
    author = ndb.StringProperty(required=True)
    comment = ndb.StringProperty(required=True, indexed=False)
    commentedOn = ndb.DateTimeProperty(required=True, indexed=False)


class Image(BaseModel):
    unique_id = ndb.StringProperty(required=True)
    image_key = ndb.BlobKeyProperty(required=True, indexed=False)


class Invite(BaseModel):
    unique_id = ndb.StringProperty(required=True)
    start = ndb.DateTimeProperty(required=True, indexed=False)
    end = ndb.DateTimeProperty(indexed=False)
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

    def get_attendees(self):
        return InviteAttendee.query(InviteAttendee.invite == self.key).fetch()

class InviteAttendee(BaseModel):
    unique_id = ndb.StringProperty(required=True)
    contact = ndb.KeyProperty(kind=Contact)
    invite = ndb.KeyProperty(kind=Invite)
    name = ndb.StringProperty(indexed=False)
    phone = ndb.StringProperty(indexed=False)
    email = ndb.StringProperty(indexed=False)


class InviteAttendeeNotification(BaseModel):
    """
        This is meant to be a historic table
        Each record being a 'ping' to a given contact in any of the channels,
        remember a contact could be just an email if the user never updates,
        the name of the contact while sending the invite
    """
    unique_id = ndb.StringProperty(required=True)
    attendee = ndb.KeyProperty(kind=InviteAttendee, required=True)
    invite = ndb.KeyProperty(kind=Invite, required=True)
    name = ndb.StringProperty(indexed=False)
    email = ndb.StringProperty(indexed=False)
    phone = ndb.StringProperty(indexed=False)
    voice_response = ndb.StringProperty(indexed=False)
    sms_response = ndb.StringProperty(indexed=False)
    email_response = ndb.StringProperty(indexed=False)
    voice_response_datetime = ndb.DateTimeProperty(indexed=False)
    sms_response_datetime = ndb.DateTimeProperty(indexed=False)
    email_response_datetime = ndb.DateTimeProperty(indexed=False)

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

class Subscription(BaseModel):
    unique_id = ndb.StringProperty(required=True)
    name = ndb.StringProperty(required=True)
    price = ndb.FloatProperty(required=True, indexed=False)


class UserSubscription(BaseModel):
    user = ndb.KeyProperty(kind=User, required=True)
    subscription = ndb.StringProperty(required=True, indexed=False)
    started_on = ndb.DateTimeProperty(required=True, indexed=False)
    is_trial = ndb.BooleanProperty(required=True, indexed=False)


class Feature(BaseModel):
    unique_id = ndb.StringProperty(required=True)
    name = ndb.StringProperty(required=True)
    Subscription = ndb.KeyProperty(kind=Subscription,required=True)


class Group(BaseModel):
    unique_id = ndb.StringProperty(required=True)
    name = ndb.StringProperty(required=True)
    user = ndb.KeyProperty(kind=User)

class GroupedContact(BaseModel):
    user = ndb.KeyProperty(kind=User)
    group_unique_id = ndb.StringProperty(required=True)
    contact_unique_id = ndb.StringProperty(required=True)


