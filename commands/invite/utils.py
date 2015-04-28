from google.appengine.api import search
import datetime


def index_invite(invite):
    """
    Stores the document in the datastore index
    Search can only be performed word by word
    """
    index = search.Index(name='invite_index')
    inviteSearch = search.Document(
        doc_id=invite.unique_id,
        fields=[
            search.TextField(
                name='title',
                value=' '.join(tokenize_autocomplete(
                    invite.title
                ))
            ),
            search.DateField(name='start', value=invite.start),
        ],
        language='en'
    )
    index.put(inviteSearch)


def tokenize_autocomplete(phrase, min=2, max=5):
    tokens = []
    for word in phrase.split():
        token = ''
        index = 0
        tokens.append(word)

        for x in word:
            if index > len(phrase)-1 or index > max:
                break
            if index > min:
                tokens.append(token)
            token += x
            index += 1
    return tokens