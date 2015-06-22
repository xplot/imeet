import json
from functools import wraps
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


def read_parameter_from_request(parameter_name, handler, kwargs=None, safe=True):

    parameter_value = handler.request.get(parameter_name, None)

    if not parameter_value and kwargs:
        parameter_value = kwargs.get(parameter_name)

    if not parameter_value and not safe:
        raise InvalidRequestException("Parameter %s not found in request" % parameter_name)
    return parameter_value


def authentication_required(handler):
    """
        Decorator that requires that the caller be authenticated in order to invoke the handler method.
    """
    @wraps(handler)
    def check_authentication(self, *args, **kwargs):
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


def invite_permission_required(permissions=None):
    """
        Decorator that requires the user to have special permissions on the invite
        Use InvitePermission.XXX to declare permissions
    """
    if not isinstance(permissions, (list, set, str)):
        raise Exception('permission parameter must be a string, or a list or set of strings.')

    if permissions is None:
        raise Exception('permission parameter must be specified.')

    # to always work with a list of permissions
    if isinstance(permissions,(str)):
        permissions = [permissions]

    def required_permission_handler(handler):
        @wraps(handler)
        def check_permissions(self, *args, **kwargs):
            # If Anonymous is allowed no further check is done
            if not permissions or InvitePermission.Anonymous in permissions:
                return handler(self, *args, **kwargs)

            try:
                invite_id = read_parameter_from_request('invite_id', self, kwargs=kwargs,safe=False)
                invite = Invite.get_by_unique_id(invite_id)
                if not invite:
                    raise InvalidRequestException("Invalid Invite Id provided")

                invite_attendee_id = None
                if InvitePermission.Attendee in permissions or InvitePermission.Organizer in permissions:
                    invite_attendee_id = read_parameter_from_request('invite_attendee_id', self, kwargs)

                current_user = None
                session_token = read_token_from_request(self.request)
                if session_token and ValidateSessionTokenCommand(session_token=session_token).execute():
                    current_user = SessionToken.get_user_from_session_token(session_token_id=session_token)

                if not ValidateInvitePermissionsCommand(
                    invite,
                    current_user=current_user,
                    invite_attendee_id=invite_attendee_id,
                    permissions=permissions
                ).execute():
                    raise AuthenticationException("You dont have the permissions to modify the current Invite")

                self.user = current_user
            except AuthenticationException, e:
                self.abort(401)
            except InvalidRequestException, e:
                self.abort(400)

            return handler(self, *args, **kwargs)
        return check_permissions
    return required_permission_handler


