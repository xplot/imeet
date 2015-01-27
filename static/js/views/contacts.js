ContactsView = SimpleView.extend({
    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click .add-contact' : 'addContact',
       'click .delete-contact' : 'deleteContact',
       'click .update-contact' : 'updateContact'
    },
    render: function(options) {
        this.clearTemplate();
        $('#contact-list').show();
    },

    addContact: function(evt){
        evt.preventDefault();
        Backbone.history.navigate(evt.target.attributes.href.value, true);
    },

    deleteContact: function(evt){
        evt.preventDefault();
        evt.target.parentNode.parentNode.parentNode.parentNode.removeChild(evt.target.parentNode.parentNode.parentNode);
        $.ajax({
            url: evt.target.parentNode.attributes.href.value,
            type: "DELETE",
            contentType: "application/json",
            cache: false,
            success: function(data) {
                alert_notification([{
                    alertType:'success',
                    message: 'Contact deleted!'
                }]);

                evt.target.parentNode.parentNode.parentNode.parentNode.removeChild(evt.target.parentNode.parentNode.parentNode);
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

    updateContact: function(evt){
        evt.preventDefault();
        Backbone.history.navigate(evt.target.attributes.href.value, true);
    }
});

ContactsNewView = SimpleView.extend({
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

        var contact = {
            name: $("#nameInput").val(),
            email: $("#emailInput").val(),
            phone: $("#phoneInput").val()
        };

        var contactTable =$('#contacts_table');
        var that = this;
        $.ajax({
            url: "/api/contacts",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(contact),
            cache: false,
            success: function(data) {
                alert_notification([{
                    alertType:'success',
                    message: 'Contact created!'
                }]);

                that.$el.html("");
                contact.contact_id = data.unique_id;
                contactTable.append(new ContactItemView().render(contact).el);
                Backbone.history.navigate("contacts", true);
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });


    }
});

ContactItemView = SimpleView.extend({
   tagName: 'tr',
   render: function(contact){
       this.$el.html("<td>" + contact.name + "</td><td>"
                    + contact.email + "</td><td>"
                    + contact.phone + "</td><td><a class='update-contact' href='api/contacts/"
                    + contact.contact_id + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></a><a class='delete-contact' href='api/contacts/"
                    + contact.contact_id +"'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a></td>");
       return this;
   }
});