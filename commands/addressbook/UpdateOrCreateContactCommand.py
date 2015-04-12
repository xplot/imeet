
class NoUserException(Exception):
    pass

class UpdateOrCreateContactCommand(object):
    def __init__(self, user, name=None, email=None, phone=None):
        if not user:
            raise NoUserException()

        self.user = user
        self.name = name
        self.email = email
        self.phone = phone
