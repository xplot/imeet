import query
from google.appengine.api import search, taskqueue
from google.appengine.ext import ndb
from models import Invite

class InviteSearchQuery(object):

    def __init__(self, user, term):
        self.term = term
        self.user = user
        if not user:
            raise Exception("Please provide a valid user")

    def query(self):
        """Returns a list of invites that matches the query"""
        if self.term is None:
            return self.get_by_user_id(self.user_id)

        index = search.Index(name='invite_index')
        invite_query = index.search(self.term)
        invite_ids = [x.doc_id for x in invite_query]

        if not invite_ids:
            return []

        invites = Invite.query(
            ndb.AND(
                Invite.unique_id.IN(invite_ids),
                Invite.user == self.user.key
            )
        ).fetch() or []

        return [query.ReducedInviteQuery(invite=x).query() for x in invites]