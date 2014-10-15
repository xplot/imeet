__author__ = 'javi830810'
import datetime
import json

from datetime import time
from google.appengine.api import memcache
from google.appengine.ext import ndb, db

from boilerplate.models import User

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


class ContactInvite(ndb.Model):
    contact_id = ndb.StringProperty()
    invite_id = ndb.StringProperty()
    voice_response = ndb.StringProperty()
    sms_response = ndb.StringProperty()
    email_response = ndb.StringProperty()

class Invite(BaseModel):
    unique_id = ndb.StringProperty()
    when = ndb.DateTimeProperty(auto_now_add=True)
    title = ndb.StringProperty()
    user = ndb.KeyProperty(kind=User)

class InviteIndex(ndb.Model):
    doc_id = ndb.StringProperty()
    title = ndb.StringProperty()
    invite_id = ndb.StringProperty()
    when = ndb.DateTimeProperty()
    language = ndb.StringProperty()

class Contact(BaseModel):
    unique_id = ndb.StringProperty()
    name = ndb.StringProperty()
    phone = ndb.StringProperty()
    email = ndb.StringProperty()