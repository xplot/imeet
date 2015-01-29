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
    }
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
        this.listenTo(this.contactList, 'remove', this.removeContact);

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

    removeContact: function(data){
        var $contact_row = $('div[data-id="'+ data.get('unique_id') + '"');
        $contact_row.remove();
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

        var contactTable = $('#contacts_table');
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
    editTemplate: JST["contact_item_edit.html"],
    model: null,
    editMode: false,

    events: {
       'click .editable' : "enterEditMode",
       'click .finish-edit' : "finishEditMode",
       'click .delete-contact' : 'deleteContact'

    },

    render: function(){
       this.$el.html(_.template(this.template(this.model.toJSON())));
       return this;
    },

    enterEditMode: function(evt){
        if(this.editMode)
            return;
        this.editMode = true;
        this.$el.html(_.template(this.editTemplate(this.model.toJSON())));
    },

    finishEditMode: function(evt){
        if(!this.editMode)
            return;
        this.editMode = false;

        this.model.set('name',$("#edit-name").val());
        this.model.set('email',$("#edit-email").val());
        this.model.set('phone',$("#edit-phone").val());

        this.saveContact();

        this.$el.html(_.template(this.template(this.model.toJSON())));
    },

    saveContact: function(){
        var unique_id = this.model.get('unique_id');

        $.ajax({
            url: api.url + "api/contacts/" +  unique_id + "/edit",
            data:JSON.stringify({
                name: this.model.get('name'),
                email: this.model.get('email'),
                phone: this.model.get('phone')
            }),
            type: "PUT",
            contentType: "application/json",
            cache: false,
            success: function(data) {
                alert_notification([{
                    alertType:'success',
                    message: 'Contact updated!'
                }]);

            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

    deleteContact: function(evt){
        evt.preventDefault();
        var $remove_link = $(evt.target);
        var unique_id = this.model.get('unique_id');

        $.ajax({
            url: api.url + "api/contacts/" + unique_id + "/delete",
            type: "DELETE",
            contentType: "application/json",
            cache: false,
            success: function(data) {
                alert_notification([{
                    alertType:'success',
                    message: 'Contact deleted!'
                }]);

                contactList.removeBy(unique_id);
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