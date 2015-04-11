class BaseModel(object):

    def __init__(self, entity):
        if not entity:
            raise Exception("Underlying entity cannot be null")

        self.entity = entity

    def __getattr__(self, name):
        """
        Every property that doesnt match this class properties,
        will be delegated into the Entity
        Remember _getattr_ will be invoked
        after usual checking of attributes in the object
        """
        return getattr(self.entity, name)

    def put(self):
        self.entity.put()

    def copy_over(self, new_entity):
        """
            Will copy the new_entity data over the old entity
            ensuring null 'new' properties are not overwritten
            on the old entity
        """
        BaseModel.entity_safe_copy(new_entity, self.entity)
        self.put()

    @classmethod
    def entity_safe_copy(cls, object_source, object_destiny):
        for x in cls.non_empty_properties(object_source):
            setattr(object_destiny, x, getattr(object_source, x))

    @classmethod
    def non_empty_properties(cls, object_source):
        for cls_property in object_source._properties:
            if getattr(object_source,cls_property):
                yield cls_property