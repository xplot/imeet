__author__ = 'javi830810'
import datetime
import json
import requests
import uuid
import webapp2

from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import Route

from models import Invite,Contact, ContactInvite, data_type_handler
import config
import logging

class InviteManager(object):

    def create(self, invite_dict):

        invite = Invite()
        invite.unique_id = str(uuid.uuid4()).replace('-', '')
        invite.title = invite_dict['title']
        invite.when = datetime.datetime.strptime(invite_dict['when'], "%Y-%m-%d")
        invite.put()

        db_contacts = []
        db_invite_contacts = []
        for x in invite_dict['contacts']:
            contact = Contact()
            contact.unique_id = str(uuid.uuid4()).replace('-', '')
            contact.name = x['name']
            contact.phone = x['phone']
            contact.email = x['email']

            db_contacts.append(contact)
            db_invite_contacts.append(
                ContactInvite(
                    invite_id=invite.unique_id,
                    contact_id=contact.unique_id
                )
            )
        ndb.put_multi(db_contacts)
        ndb.put_multi(db_invite_contacts)

    def send(self, invite_dict):
        self._post_invite(invite_dict)

    def _post_invite(self,invite):
        url = config.voiceflows_url
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

        logging.info(json.dumps(
                invite,
                default=data_type_handler,
                indent = 4
            )
        )

        r = requests.post(
            url,
            data=json.dumps(
                invite,
                default=data_type_handler,
                indent = 4
            ),
            headers=headers
        )