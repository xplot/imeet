import webapp2
import logging
from google.appengine.api import mail
from google.appengine.ext import ndb
from webapp2 import RequestHandler
from boilerplate.models import LogEmail


class SendEmailHandler(RequestHandler):
    """
    Core Handler for sending Emails
    Use with TaskQueue
    """
    def post(self):
        """ Email Sender.

            The Sender is going to be chosen as follows:
             1 - If Provided we'll try to use it.
             1.1 - IF Provided failed. We GOTO 2
             2 - If Not Provided we use our config email address.
             3 - If no config address we will use an address with the form no-reply@<app-id>.appspotmail.com

        """
        try:
            to = self.request.get("to")
            subject = self.request.get("subject")
            body = self.request.get("body")
            sender = self.request.get("sender")

            if not sender:
                sender = self.app.config.get('email_sender')

            if self.app.config.get('log_email', False):
                try:
                    log_email = LogEmail(
                        sender=sender,
                        to=to,
                        subject=subject,
                        body=body,
                        when=boilerplate.utils.get_date_time("datetimeProperty")
                    )
                    log_email.put()
                except Exception,ex:
                    logging.error("Error saving Email Log in datastore")
                    logging.exception(ex)

            message = mail.EmailMessage()
            message.sender = sender
            message.to = to
            message.subject = subject
            message.html = body
            message.send()

        except Exception as e:
            logging.error(e)
            raise