import uuid

def guid():
    return str(uuid.uuid4()).replace('-', '')

def copy_over(object_source, object_destiny):
    for x in non_empty_properties(object_source):
        if hasattr(object_destiny, x):
            setattr(object_destiny, x, getattr(object_source, x))

def non_empty_properties(object_source):
    for cls_property in object_source.__dict__:
        if getattr(object_source, cls_property):
            yield cls_property