Contact = Backbone.Model.extend({
      defaults: {
        name: '',
        email: '',
        phone: ''
      }
    });

ContactList = Backbone.Collection.extend({
      model: Contact,
      localStorage: new Store("backbone-contact")
    });

ContactsView = SimpleView.extend({
    first_time: true,

    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click .add-contact' : 'navigateToAddContact',
    },

    render: function(options) {
        $('#contact-list').show();

        if(!this.first_time){
            return;
        }
        this.contactList = options.contactList;

        this.listenTo(this.contactList, 'add', this.addContact);
        //this.listenTo(this.contactList, 'remove', this.addContact);

        this.clearTemplate();

        var contactTable =$('#contacts_table');
        contactList.each(function(contact){
            contactTable.append(new ContactItemView({model: contact}).render().el);
        });

        this.first_time = false;
    },

    addContact: function(contact){
        var contactTable =$('#contacts_table');
        contactTable.append(new ContactItemView({model: contact}).render().el);
    },

    render_full_list: function(){

    },

    navigateToAddContact: function(evt){
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
        if(!validator.validateItems('.contact_input')){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        var contact = new Contact ({
            name: $("#nameInput").val(),
            email: $("#emailInput").val(),
            phone: $("#phoneInput").val()
        });

        var contactTable =$('#contacts_table');
        var that = this;
        $.ajax({
            url: "/api/contacts",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                user_id: currentUser.id,
                contact: contact
            }),
            cache: false,
            success: function(unique_id) {
                alert_notification([{
                    alertType:'success',
                    message: 'Contact created!'
                }]);

                that.$el.html("");

                contact.set("unique_id", unique_id);
                contactList.create(contact);
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
   template: JST["contact_item.html"],
   model: null,
    events: {
       'click .editable' : "enterEditMode",
       'click .delete-contact' : 'deleteContact'

   },
   render: function(){
       this.$el.html(_.template(this.template(this.model.toJSON())));
       return this;
   },

   enterEditMode: function(evt){
       console.log("entering edit mode..");
   },

   deleteContact: function(evt){
        evt.preventDefault();
        //evt.target.parentNode.parentNode.parentNode.parentNode.removeChild(evt.target.parentNode.parentNode.parentNode);
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
    }
});