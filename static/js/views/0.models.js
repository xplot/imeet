
Contact = Backbone.Model.extend({
      defaults: {
        name: '',
        email: '',
        phone: ''
      }
    });

ContactList = Backbone.Collection.extend({
    model: Contact,

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

InviteModel = Backbone.Model.extend({
    defaults: {
        'title': '',
        'start': '',

        'end': '',
        'description': '',
        'where': '',
        'contacts': new ContactList(),
        'all_contacts': new ContactList(),
        'all_groups': new ContactList(),
    },

    format_date: function(property, format){
        var _date = this.get(property);

        if(_date == '' || _date == null)
            return null;

        return moment(_date).format(format);
    },

    toJSON: function(){
        var json = Backbone.Model.prototype.toJSON.apply(this, arguments);

        json['start_date'] = this.format_date('start', 'MM/DD/YYYY');
        json['start_time'] = this.format_date('start', 'HH:MM');

        json['end_date'] = this.format_date('end', 'MM/DD/YYYY');
        json['end_time'] = this.format_date('end', 'HH:MM');

        return json;
    }

});
