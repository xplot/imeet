__author__ = 'ajadex'

from google.appengine.api import taskqueue

import logging


class SendConfirmationInviteToOrganizerCommand(object):

    def __init__(self, invite):
        self.invite = invite

    def execute(self):

        email_url = "/taskqueue-send-email/"
        confirm_url = "http://imeet.io/invite/confirm/" + self.invite.unique_id
        taskqueue.add(url=email_url, params={
            'from': 'noreply@imeet.io',
            'to': str(self.invite.organizer_email),
            'subject': 'confirm your iMeet event',
            'body': '<html>Please confirm your event by clicking <a href="' + confirm_url + '">here</a> (or copy this url'
                    + confirm_url + ' in your browser).</html>',
            }
        )

