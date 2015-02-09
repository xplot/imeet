import datetime
import json
import uuid

from google.appengine.api import search, taskqueue
from google.appengine.ext import ndb

from models.models import Group
from models.models import Contact, User, Group, GroupedContact


class GroupManager(object):

    def __init__(self, user_key, user=None):
        if user_key:
            self.user_key = user_key
        else:
            self.user_key = user.key

    def _get_group(self, group_id=None, group_name=None):
        if group_id is not None:
            return Group.query(
                ndb.AND(
                    Group.unique_id == group_id
                )
            ).get()
        else:
            return Group.query(
                ndb.AND(
                    Group.name == group_name,
                    Group.user == self.user_key
                )
            ).get()

    def get_groups_for_user(self):
        return Group.query(Group.user == self.user_key).fetch()

    def get_contacts_in_group(self, group_id):
        contact_ids = [
            x.contact_unique_id for x in
            GroupedContact.query(
                GroupedContact.group_unique_id == group_id,
            ).fetch()
        ]

        group_contacts = []

        if contact_ids:
            group_contacts = Contact.query(
                Contact.unique_id.IN(contact_ids)
            ).fetch()

        return [{
            'unique_id': contact.unique_id,
            'name': contact.name,
            'phone': contact.phone,
            'email': contact.email,
            }
            for contact in group_contacts
        ]

    def get_contacts_sorted_by_group(self):
        contacts = Contact.query(Contact.user == self.user_key).fetch()
        groupged_contacts = GroupedContact.query(GroupedContact.user == self.user_key).fetch()
        groups = self.get_groups_for_user()

        result = {
            'groups': [{
                'unique_id': x.unique_id,
                'name': x.name
            } for x in groups],
            'contacts': []
        }

        for contact in contacts:
            contact_groups = []
            for groupged_contact in groupged_contacts:
                if groupged_contact.contact_unique_id == contact.unique_id:
                    contact_groups.append(groupged_contact.group_unique_id)

            result['contacts'].append({
                'unique_id': contact.unique_id,
                'name': contact.name,
                'phone': contact.phone,
                'email': contact.email,
                'groups': contact_groups
            })

        return result

    def is_contact_in_group(self, contact_id, group_id=None):
        return GroupedContact.query(
            ndb.AND(
                GroupedContact.contact_unique_id == contact_id,
                GroupedContact.group_unique_id == group_id
            )
        ).get() is not None

    def insert(self, group_name):
        existing_group = self._get_group(group_name=group_name)
        if existing_group:
            return existing_group

        group = Group()
        group.unique_id = str(uuid.uuid4()).replace('-', '')
        group.user = self.user_key
        group.name = group_name
        group.put()
        return group

    def remove(self, group_id):
        group = self._get_group(group_id=group_id)
        if group is not None:
            group.key.delete()
        raise Error("Grouped Contacts have to be removed too")

    def add_contact_to_group(self, group_id, contact_id):

        if self.is_contact_in_group(contact_id, group_id=group_id):
            return

        grouped_contact = GroupedContact()
        grouped_contact.group_unique_id = group_id
        grouped_contact.contact_unique_id = contact_id
        grouped_contact.user = self.user_key
        grouped_contact.put()
        return grouped_contact