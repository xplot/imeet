import logging
import uuid
import json

from managers.group import GroupManager
from managers.auth import user_context
from boilerplate.basehandler import BaseHandler
from base import JsonHandler
from google.appengine.ext import ndb
from models import Contact


class ApiGroupHandler(JsonHandler):

    @user_context
    def get(self):
        group_manager = GroupManager(self.user.key)
        return [{
            'unique_id': x.unique_id,
            'name': x.name
        } for x in group_manager.get_groups_for_user()]

    @user_context
    def add(self, group_name):
        group_manager = GroupManager(self.user.key)
        group = group_manager.insert(group_name)
        return group.unique_id

    @user_context
    def update_group(self, group_id):
        group_data = self._data().get('group')

        group_manager = GroupManager(self.user.key)
        group_manager.update(group_id, group_data['name'])
        return {
            'unique_id': group_id,
            'name': group_data['name']
        }

    @user_context
    def remove(self, group_id):
        group_manager = GroupManager(self.user.key)
        group_manager.remove(group_id)

        return {
            'unique_id': group.unique_id
        }

    @user_context
    def add_contact_to_group(self, group_id, contact_id):
        contact = Contact.query(Contact.unique_id == contact_id).get()

        if not contact:
            raise Exception("Contact not found")

        group_manager = GroupManager(self.user.key)
        group_manager.add_contact_to_group(group_id, contact_id)

        return {
            'unique_id': group_id,
            'contact_id': contact_id
        }

    @user_context
    def get_contacts_in_group(self, group_id):
        group_manager = GroupManager(self.user.key)
        return group_manager.get_contacts_in_group(group_id)

    @user_context
    def get_all_groups_and_contacts(self):
        group_manager = GroupManager(self.user.key)
        return group_manager.get_contacts_sorted_by_group()