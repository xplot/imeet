from google.appengine.api import taskqueue
from main import JINJA_ENVIRONMENT

import logging


class SendConfirmationInviteToOrganizerCommand(object):

    def __init__(self, invite, host='imeet.io'):
        self.invite = invite
        self.host = host

    def execute(self):

        email_url = "/taskqueue-send-email/"
        confirm_url = "http://" + self.host + "/invite/confirm/" + self.invite.unique_id
        template_val = {
            "fullname": self.invite.organizer_email,
            "email": self.invite.organizer_email,
            "activation_url": confirm_url,
            "support_url": "no_support_url_as_of_yet",
            'url': confirm_url,
            'invite': self.invite
        }
        template = JINJA_ENVIRONMENT.get_template("emails/invite_confirmation.html")
        email_body = template.render(**template_val)

        taskqueue.add(url=email_url, params={
            'from': 'noreply@imeet.io',
            'to': str(self.invite.organizer_email),
            'subject': 'Confirm your iMeet Event',
            'body': email_body,
            }
        )

