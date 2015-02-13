Contact = Backbone.Model.extend({
      defaults: {
        name: '',
        email: '',
        phone: ''
      }
    });

ContactList = Backbone.Collection.extend({
    model: Contact,
    localStorage: new Store("backbone-contact"),

    getById: function(unique_id){
        return this.filter(function(val) {
            return val.get("unique_id") === unique_id;
        });
    },

    removeBy: function(unique_id){
        this.remove(this.getById(unique_id));
    },

    collectionToJSON : function() {
      return this.map(function(model){
          return model.toJSON2()
      });
    }
 });


Group = Backbone.Model.extend({
    defaults: {
        name: '',
        contacts: new ContactList()
    }
});

GroupList = Backbone.Collection.extend({
    model: Group,
    localStorage: new Store("backbone-group"),

    getById: function(unique_id){
        return this.filter(function(val) {
            return val.get("unique_id") === unique_id;
        });
    },

    removeBy: function(unique_id){
        this.remove(this.getById(unique_id));
    },

    collectionToJSON : function() {
      return this.map(function(model){
          return model.toJSON2()
      });
    }
 });