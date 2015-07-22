__author__ = 'ajadex'

from boilerplate.basehandler import BaseHandler
from models import Invite

from commands import PostInviteToVoiceflowsCommand


class InviteConfirmationHandler(BaseHandler):

    def view_confirmation(self, invite_id):
        invite = Invite.get_by_unique_id(invite_id)
        if not invite.organizer_email:
            raise Exception("There's no need for a confirmation email for this invite")
        return self.render_template("invite_confirmation.html", organizer_email=invite.organizer_email)

    def confirm(self, confirmation_id):
        #we are using the confirmation_id as the invite_id for now
        invite = Invite.get_by_unique_id(confirmation_id)
        if not invite:
            raise Exception("We couldn't find the invite. Check if your link is valid.")
        command = PostInviteToVoiceflowsCommand(invite)
        command.execute()
        return self.redirect('/invite/' + invite.unique_id + '/edit')
