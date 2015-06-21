import json
from models import Invite, InviteAttendee, InvitePermission, SessionToken
from commands import ValidateInvitePermissionsCommand, ValidateSessionTokenCommand

class AuthenticationException(Exception):
    pass


class InvalidRequestException(Exception):
    pass


def read_token_from_request(request):
    if request.authorization:
        auth_type, credentials = request.authorization

        if auth_type.lower() == "basic":
            decoded_credentials = base64.b64decode(credentials)
            username, password = decoded_credentials.split(':')

            return AuthenticateUserCommand(
                username=username,
                raw_password=password
            ).execute().unique_id
    else:
        if request.get('session_token', None):
            return request.get('session_token')
        elif request.headers.get('session_token', None):
            return request.headers.get('session_token', None)

    return None


def read_invite_id_from_request(handler, request):

    invite_id = request.get('unique_id', None)

    content_type = request.headers.get('Content-Type')

    if not invite_id and content_type == 'application/json':
        # jsonHandler is assumed here
        body = handler.data()
        invite_id = body.get('unique_id')

    if not invite_id:
        raise InvalidRequestException("Invite Id not found in request")
    return invite_id


def read_invite_attendee_from_request(handler, request):

    invite_attendee_id = request.get('invite_attendee_id', None)

    content_type = request.headers.get('Content-Type')

    if not invite_attendee_id and content_type == 'application/json':
        # jsonHandler is assumed here
        body = handler.data()
        invite_id = body.get('invite_attendee_id')

    return invite_attendee_id


def invite_permission_required(permissions=None, any=False):
    """
        Decorator that requires the user be Authenticated AND Authorized
        with one or more permissions in order to invoke the handler method.
    """
    if not isinstance(permissions, (list, set, str)):
        raise Exception('permission parameter must be a string, or a list or set of strings.')

    if permissions is None:
        raise Exception('permission parameter must be specified.')

    # to always work with a list of permissions
    if isinstance(permissions,(str)):
        permissions = [permissions]

    @wraps(handler)
    def check_permissions(self, *args, **kwargs):
        # If Anonymous is allowed no further check is done
        if not permissions or InvitePermission.Anonymous in permissions:
            return handler(self, *args, **kwargs)

        try:
            invite_id = read_invite_id_from_request(self, self.request)
            invite = Invite.get_by_unique_id(invite_id)
            if not invite:
                raise InvalidRequestException("Invalid Invite Id provided")

            invite_attendee_id = None
            if InvitePermission.Attendee in permissions or InvitePermission.Organizer in permissions:
                invite_attendee_id = read_invite_attendee_from_request(self, request)

            current_user = None
            session_token = read_token_from_request(self.request)
            if session_token and ValidateSessionTokenCommand(session_token=session_token).execute():
                current_user = SessionToken.get_user_from_session_token(session_token_id=session_token)

            if not ValidateInvitePermissionsCommand(
                invite,
                current_user=current_user,
                invite_attendee_id=invite_attendee_id,
                permissions=permissions
            ):
                raise AuthenticationException("You dont have the permissions to modify the current Invite")

            self.user = current_user
        except AuthenticationException, e:
            self.abort(401)
        except InvalidRequestException, e:
            self.abort(400)

        return handler(self, *args, **kwargs)

    return check_permissions


def authentication_required(handler):
    """
        Decorator that requires that the caller be authenticated in order to invoke the handler method.
    """
    @wraps(handler)
    def check_authentication(self, *args, **kwargs):
        # If Anonymous is allowed no further check is done
        if InvitePermission.Anonymous in permissions:
            return handler(self, *args, **kwargs)

        try:
            session_token = read_token_from_request(self.request)

            if not ValidateSessionTokenCommand(session_token=session_token).execute():
                raise AuthenticationException("Invalid Session Token provided")

            # Totally authenticated and permitted
            self.user = SessionToken.get_user_from_session_token(
                session_token_id=session_token
            )

        except AuthenticationException, e:
            self.abort(401)
        except AuthorizationException, e:
            self.abort(403)

        return handler(self, *args, **kwargs)

    return check_authentication