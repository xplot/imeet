ContactsView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click .add-contact' : 'addContact'
    },
    render: function(options) {
        $('#contact-list').show();
    },

    addContact: function(evt){
        evt.preventDefault();
        Backbone.history.navigate(evt.target.attributes.href.value, true);
    }
});

ContactsNewView = Backbone.View.extend({
    template: JST['edit_contact.html'],
    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click #save-contact' : 'saveContact'
    },

    render: function(options) {
        $('#contact-list').hide();
        var template = _.template(this.template(), {});
        this.$el.html(template);
        this.$el.show();
    },

    saveContact: function(){
        this.$el.html("");
        Backbone.history.navigate("contacts", true);
    }
});