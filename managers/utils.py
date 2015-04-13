import datetime
import hmac
import hashlib
import base64
import uuid
from config import config

def guid():
    return str(uuid.uuid4()).replace('-', '')


def copy_over(object_source, object_destiny):
    for x in non_empty_properties(object_source):
        if hasattr(object_destiny, x):
            setattr(object_destiny, x, getattr(object_source, x))


def non_empty_properties(object_source):
    for cls_property in object_source.__dict__:
        if getattr(object_source, cls_property):
            yield cls_property


def get_voiceflows_headers():
    now = datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:00 GMT")
    secret = '8\x0c7_\x01\t/{C)6V`\x1c!'
    dig = hmac.new(secret, msg=now, digestmod=hashlib.sha256).digest()
    authToken = "Voiceflows " + base64.b64encode(dig).decode()

    return {
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        'Date': now,
        'Authorization': authToken
    }