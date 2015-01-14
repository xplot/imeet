__author__ = 'javi830810'
import datetime
import json
import uuid

from google.appengine.api import search, taskqueue
from google.appengine.ext import ndb

from models.models import Invite, Contact, ContactInvite, Location, Comment
from boilerplate.models import User


class InviteManager(object):
    invite_index = 'invite_index'

    def __init__(self, invite=None,invite_dict=None, user=None):
        self.user = user
        self.invite_dict = invite_dict
        self.invite = invite

    def create(self):
        """
        Creates an invitation out of the supplied dictionary
        This is a valid data-format:
        {
            'contacts': [
                {
                    'phone': '',
                    'email': 'javi@javi.com',
                    'name': u''
                }
            ],
            'EmailTemplate':{
                'Url': self.host_url + "/template/default_invite_template.html"
            },
            'start': '2014-10-06 04:01AM',
            'end': '2014-10-06 04:01AM',
            'where': {
                'address':  'some street',
                'suite':    '18',
                'city':     'Honolulu',
                'state':    'HI',
                'zip':      '12313'
            },
            'title': 'Candle',

            'user_id': u'5302669702856704' #Not mandatory, could be anonymous
        }
        """
        invite = Invite()
        invite.unique_id = str(uuid.uuid4()).replace('-', '')
        self.invite_dict['inviteId'] = invite.unique_id
        invite.title = self.invite_dict['title']
        invite.description = self.invite_dict.get('description', None)

        #12/09/2014 12:00 AM
        invite.start = datetime.datetime.strptime(self.invite_dict['start'], "%m/%d/%Y %H:%M %p")
        if self.invite_dict.get('end', None):
            invite.end = datetime.datetime.strptime(self.invite_dict['end'], "%m/%d/%Y %H:%M %p")

        where_dict = self.invite_dict.get('where', None)

        if where_dict is not None and where_dict.get('address', None):
            where = Location()
            where.unique_id = str(uuid.uuid4()).replace('-', '')
            where.address = where_dict['address']
            where.suite = where_dict['suite']
            where.city = where_dict['city']
            where.state = where_dict['state']
            where.zip = where_dict['zip']
            where.put()
            invite.where = where.key

        if self.user:
            invite.user = self.user.key

        invite.put()

        db_contacts = []
        db_invite_contacts = []
        for x in self.invite_dict['contacts']:
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

        #Finally we index the Document
        self._index_document(invite)

        self.invite = invite
        return invite.unique_id

    def _index_document(self, invite):
        """
        Stores the document in the datastore index
        Search can only be performed word by word
        """
        index = search.Index(name=self.invite_index)
        inviteSearch = search.Document(
            doc_id=invite.unique_id,
            fields=[
                search.TextField(name='title', value=invite.title),
                search.DateField(name='start', value=invite.start),
            ],
            language='en'
        )
        index.put(inviteSearch)

    def send(self, invite_template, extra_data={}):

        invite_dict = self.invite_dict
        invite_dict['EmailTemplate'] = invite_template
        invite_dict['ExtraContextData'] = extra_data

        import logging
        logging.info("Invite to Send")
        logging.info(invite_dict)

        """Send the invite out"""
        taskqueue.add(
            url='/api/invite/post',
            headers={
                'Date':'test'
            },
            params={
                'invite': json.dumps(invite_dict)
            }
        )

    def get(self, id):
        """Get the invite by id"""
        invite = Invite.query(Invite.unique_id == id).get()
        if invite is None:
            raise Exception('Invite not found with id: ' + id)
        return self._build(invite)

    def get_by_user_id(self, user_id):
        """Search all the invites by user_id"""
        user = User.get_by_id(long(user_id))
        invites = Invite.query(
            Invite.user == user.key
        ).fetch() or []
        return [self._build(x) for x in invites]

    def search(self, user_id, term=None):
        """Search all the invites with the given term in the title"""

        if term is None:
            return self.get_by_user_id(user_id)

        user = User.get_by_id(long(user_id))
        if user is None:
            raise Exception("Please provide a valid user")

        index = search.Index(name=self.invite_index)
        invite_query = index.search(term)
        invite_ids = [x.doc_id for x in invite_query]

        if not invite_ids:
            return []

        invites = Invite.query(
            ndb.AND(
                Invite.unique_id.IN(invite_ids),
                Invite.user == user.key
            )
        ).fetch() or []

        return [self._build(x) for x in invites]

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

    def add_comment(self, id, author, commentText):
        """Get the invite by id"""
        invite = Invite.query(Invite.unique_id == id).get()
        if invite is None:
            raise Exception('Invite not found with id: ' + id)

        if invite.comments is None:
            invite.comment = []

        comment = Comment()
        comment.author = author
        comment.comment = commentText
        comment.commentedOn = datetime.datetime.now()
        invite.comments.append(comment)
        invite.put()

    def get_comments(self, id):
        invite = Invite.query(Invite.unique_id == id).get()
        return {'comments':[{
                'author': c.author,
                'comment': c.comment,
                'on': c.commentedOn.strftime("%Y-%m-%d %H:%M")
            } for c in invite.comments]}

    def _build(self, invite=None):
        if invite is None:
            invite = self.invite

        #contacts
        contacts_invites = {x.contact_id:x for x in ContactInvite.query(ContactInvite.invite_id == invite.unique_id).fetch()}

        location = None
        if invite.where is not None:
            location = Location.get_by_id(invite.where.id())

        contacts = []
        if contacts_invites:
            contacts = Contact.query(Contact.unique_id.IN(contacts_invites.keys())).fetch()
        return self._to_dict(invite, contacts_invites, contacts, location)

    def _to_dict(self, invite, contacts_invites, contacts, location=None):

        if invite.comments is None:
            invite.comments = []

        initial = {
            'unique_id':invite.unique_id,
            'title':invite.title,
            'start': invite.start.strftime("%Y-%m-%d %H:%M"),
            'end': invite.end.strftime("%Y-%m-%d %H:%M") if invite.end is not None else '',
            'description': invite.description,
            'where': None,
            'contacts':[{
                'id': x.unique_id,
                'name':x.name,
                'phone': x.phone,
                'email':x.email,
                'sms_response': contacts_invites[x.unique_id].sms_response,
                'voice_response': contacts_invites[x.unique_id].voice_response,
                'email_response': contacts_invites[x.unique_id].email_response,
            } for x in contacts],
            'comments':[{
                'author': c.author,
                'comment': c.comment,
                'on': c.commentedOn.strftime("%Y-%m-%d %H:%M")
            } for c in invite.comments]
        }

        if location is not None:
            initial['where'] = {
                'address': location.address,
                'suite': location.suite,
                'city': location.city,
                'state': location.state,
                'zip':location.zip
            }
        return initial
