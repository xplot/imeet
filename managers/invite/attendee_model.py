import uuid
from managers.utils import guid
from models import Contact, InviteAttendee
from google.appengine.ext import ndb
from managers.invite import InviteMapper, InviteModel


class BulkInviteAttendeeModel:

    def __init__(self, invite_model):
        self.invite_model = invite_model

    def include_attendees(self, invite_attendee_models):
        bulk_attendees = []
        for attendee in invite_attendee_models:
            #Check if the contact exist and update/maybe
            attendee.include_in_invite(False)  # no put
            bulk_contacts.append(attendee.invite_attendee)
        ndb.put_multi(bulk_attendees)

    def notify_all(self):
        invite_attendee_models = [
            InviteAttendeeModel(x)
            for x in InviteAttendee.query(
                InviteAttendee.invite_id == self.invite_model.unique_id
            ).fetch()
        ]
        self._notify_attendees(invite_attendee_models)

    def notify_attendees(self, attendee_ids):
        invite_attendee_models = [
            InviteAttendeeModel(x)
            for x in InviteAttendee.query(
                InviteAttendee.unique_id.IN(attendee_ids)
            ).fetch()
        ]
        self._notify_attendees(invite_attendee_models)

    def _notify_attendees(self, invite_attendee_models):
        body = {
            'invite_id': self.invite_model.unique_id,
            'uniquecall_id': guid(),
            'email_template': {
                'url': self.invite_model.email_template,
                'subject': "You have been invited to {{title}}",
                'responseRedirectURL': self.invite.email_response_template
            },
            'contacts': []
        }
        bulk_notifications = []
        for attendee in invite_attendee_models:
            attendee_notification = attendee.notify(False)
            bulk_notifications.append(attendee_notification)

            notification_dict = InviteMapper.invite_attendee_to_dict(attendee)
            notification_dict['unique_id'] = attendee_notification.unique_id
            body['contacts'].append(notification_dict)

        #Save in Database the Invitation to this contact
        ndb.put_multi(contact_invites)

        EventQueue.push_event(
            endpoint=config.get('api_url') + "/contacts",
            headers=get_voiceflows_headers(),
            payload=body,
            group_id=self.unique_id,
            priority=1
        )


class InviteAttendeeModel(object):

    def __init__(self, invite_attendee):
        self.invite_attendee = invite_attendee

    @classmethod
    def create_from_raw_data(cls, invite_model, contact_unique_id=None, name=None, email=None, phone=None):
        if not name and not email and not phone:
            raise Error(
                "At least one of the properties "
                "has to be filled (name, email, phone)"
            )
        contact_in_address_book = None
        if contact_unique_id:
            contact_in_address_book = Contact.get_by_unique_id(contact_unique_id)
        else:
            #Let's try to lookup a contact with the same details
            contact_in_address_book = Contact.query(
                ndb.OR(
                    Contact.email == self.email,
                    Contact.phone == self.phone
                )
            )
            if not contact_in_address_book:
                contact = Contact(
                    unique_id=guid(),
                    name=name,
                    email=email,
                    phone=phone
                )
                contact.put()

        return InviteAttendeeModel(
            InviteAttendee(
                unique_id=guid(),
                contact=contact_in_address_book.key,
                invite=invite_model.invite.key
            )
        )

    def __getattr__(self, name):
        return getattr(self.invite_attendee, name)

    def include_in_invite(self, put=True):
        """
            This will include the attendee in the invite
            Finally saving the record in DB, plus trying to make connections
            between the sender contacts or current iMeet users
        """

        invite_attendee = InviteAttendee(
            invite=self.invite_model.invite.key.id(),
            unique_id=guid()
        )

        contact_in_address_book = Contact.query(
            ndb.OR(
                Contact.email == self.email,
                Contact.phone == self.phone
            )
        )
        if contact_in_address_book:
            invite_attendee.contact = contact_in_address_book.key
        else:
            contact = Contact(
                unique_id=guid(),
                name=self.name,
                email=self.email,
                phone=self.phone
            )
            contact.put()

        if put:
            invite_attendee.put()

        return invite_attendee

    def notify(self, put=True):
        attendee_notification = InviteAttendeeNotification(
            unique_id=guid(),
            invite=self.invite_model.invite.key.id(),
            attendee=self.key.id(),
            email=email,
            phone=phone,
        )
        if put:
            attendee_notification.put()
        return attendee_notification

    def exclude_from_invite(self):
        self.invite_attendee.key.delete()
        return unique_id