import uuid

def guid():
    return str(uuid.uuid4()).replace('-', '')

