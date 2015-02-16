ContactsView = SimpleView.extend({
    first_time: true,

    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click .add-contact' : 'navigateToAddContact',
       'change #import-csv' : 'importFromCsv',
       'click .add-group' : 'addGroup',
        'mouseup div': 'mouseUp',
    },

    render: function(options) {
        $('#contact-list').show();
        $('#contact-new').hide();

        if(!this.first_time){
            return;
        }
        this.contactList = options.contactList;
        this.groupList = options.groupList;

        this.listenTo(this.contactList, 'add', this.addContact);
        this.listenTo(this.contactList, 'remove', this.removeContact);

        var groupsTable =$('.groups_table');
        var contactTable =$('#contacts_table');
        contactList.each(function(contact){
            contactTable.append(new ContactItemView({model: contact}).render().el);
        });

        this.groupListView = new GroupListView({
            el: '.groups_table'
        });
        this.groupListView.render({
            groupList: this.groupList,
            contactList: this.contactList
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
        Backbone.history.navigate("/contacts/new", true);
    },

    importFromCsv: function(evt){

        var reader = new FileReader();
        // closure to capture the file information.
        reader.onload = (function(theFile,that) {
            return function(e) {
                $.ajax({
                    url: "/api/contacts/csv",
                    type: "POST",
                    contentType: "application/json",
                    data: '{"file_name": "{0}", "file": "{1}"}'.format(theFile.name, e.target.result),
                    cache: false,
                    success: function() {
                        alert_notification([{
                            alertType:'success',
                            message: 'Contact created!'
                        }]);

                        console.info("file uploaded correctly.")
                    },
                    error: function(data) {
                        alert_notification([{
                            alertType:'danger',
                            message: data.responseText
                        }]);
                    }
                });
            };
        })(evt.target.files[0],this);

        // Read in the image file as a data URL.
        reader.readAsDataURL(evt.target.files[0]);
    },

    addGroup: function(){
        this.groupListView.showDialog();
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
        console.log(options);
        this.contactList = options.contactList;

        var template = this.template({});
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


                contact.set("unique_id", unique_id);
                that.contactList.add(contact);
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
    template: JST["contact_item.html"],
    editTemplate: JST["contact_item_edit.html"],
    model: null,
    editMode: false,

    events: {
       'dragstart .contact-row': 'enterDragMode',
       'click .editable' : "enterEditMode",
       'click .finish-edit' : "finishEditMode",
       'click .delete-contact' : 'deleteContact'
    },

    render: function(){
       this.$el.html(this.template(this.model.toJSON()));
       return this;
    },

    enterDragMode: function(ev){
        //ev.preventDefault();
        //ev.stopPropagation();
        var unique_id = this.model.get('unique_id');
        ev.originalEvent.dataTransfer.setData("contact_id", unique_id);
    },

    enterEditMode: function(evt){
        if(this.editMode)
            return;
        this.editMode = true;
        this.$el.html(this.editTemplate(this.model.toJSON()));
    },

    finishEditMode: function(evt){
        if(!this.editMode)
            return;
        this.editMode = false;

        this.model.set('name',$("#edit-name").val());
        this.model.set('email',$("#edit-email").val());
        this.model.set('phone',$("#edit-phone").val());

        this.saveContact();

        this.$el.html(this.template(this.model.toJSON()));
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
//                alert_notification([{
//                    alertType:'success',
//                    message: 'Contact updated!'
//                }]);

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