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
        invite_dict['inviteId'] = invite.unique_id
        invite.title = invite_dict['title']
        invite.when = datetime.datetime.strptime(invite_dict['when'], "%Y-%m-%d")
        invite.put()

        db_contacts = []
        db_invite_contacts = []
        for x in invite_dict['contacts']:
            contact = Contact()
            contact.unique_id = str(uuid.uuid4()).replace('-', '')
            x['contactId'] = contact.unique_id
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

    def get(self, id):
        invite = Invite.query(Invite.unique_id == id).get()

        if invite is None:
            raise Exception('Invite not found with id: ' + id)

        #contacts
        contacts_invites = {x.contact_id:x for x in ContactInvite.query(ContactInvite.invite_id == id).fetch()}
        contacts = []
        if contacts_invites:
            contacts = Contact.query(Contact.unique_id.IN(contacts_invites.keys())).fetch()

        return {
            'title':invite.title,
            'when': invite.when.strftime("%Y-%m-%d %H:%M"),
            'contacts':[{
                'name':x.name,
                'phone': x.phone,
                'email':x.email,
                'sms_response': contacts_invites[x.unique_id].sms_response,
                'voice_response': contacts_invites[x.unique_id].voice_response,
                'email_response': contacts_invites[x.unique_id].email_response,
            } for x in contacts]
        }

    def search(self, term):
        self._post_invite(invite_dict)


    def accept(self, invite_id, contact_id, channel, response):
        contact_invite = ContactInvite.query(
            ndb.AND(
                ContactInvite.invite_id == invite_id,
                ContactInvite.contact_id == contact_id
            )
        ).get()

        if contact_invite is None:
            raise Exception('No contact was found with the following id: ' + contact_id)

        if channel == 'sms':
            contact_invite.sms_response = response
        elif channel == 'voice':
            contact_invite.voice_response = response
        elif channel == 'email':
            contact_invite.email_response = response

        contact_invite.put()

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