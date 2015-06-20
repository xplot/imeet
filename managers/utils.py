import datetime
import hmac
import hashlib
import base64
import uuid
import cgi
from config import config

def guid():
    return str(uuid.uuid4()).replace('-', '')


def copy_over(object_source, object_destiny):
    for x in non_empty_properties(object_source):
        if x == 'unique_id':
            continue
        if hasattr(object_destiny, x):
            setattr(object_destiny, x, getattr(object_source, x))

def non_empty_properties(object_source):
    for cls_property in object_source.__dict__:
        if getattr(object_source, cls_property):
            yield cls_property


def get_voiceflows_headers():
    
    return {
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        'session_token': config.get('api_session_token')
    }


def sanitize(input):
    """
        Sanitizes input from the client in the form of URL Encode
        It will recursively loop over the request and sanitize all the objects
    """
    if isinstance(input, list):
        for x in range(0, len(input)):
            input[x] = sanitize(input[x])
    elif isinstance(input, basestring):
        input = cgi.escape(input)
    elif isinstance(input, dict):
        for x in input.keys():
            input[x] = sanitize(input[x])

    return input


def convert_to_user_date(date, offset):
    if not date or not offset:
        return date

    return date - datetime.timedelta(minutes=offset)
