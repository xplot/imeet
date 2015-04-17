from google.appengine.api import search


def index_invite(invite):
    """
    Stores the document in the datastore index
    Search can only be performed word by word
    """
    index = search.Index(name='invite_index')
    inviteSearch = search.Document(
        doc_id=invite.unique_id,
        fields=[
            search.TextField(name='title', value=invite.title),
            search.DateField(name='start', value=invite.start),
        ],
        language='en'
    )
    index.put(inviteSearch)