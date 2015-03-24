from google.appengine.ext import ndb

class Event(ndb.Model):
    unique_id = ndb.StringProperty()
    endpoint = ndb.StringProperty()
    headers = ndb.TextProperty()
    method = ndb.StringProperty()
    payload = ndb.TextProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    retries = ndb.IntegerProperty(default=0)
    status = ndb.StringProperty()

    @classmethod
    def get_by_unique_id(cls, unique_id):
        """Gets an Event by its unique_id"""
        return cls.query(cls.unique_id == unique_id).get()