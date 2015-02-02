ContactsView = SimpleView.extend({
    first_time: true,

    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click .add-contact' : 'navigateToAddContact',
       'change #import-csv' : 'importFromCsv',
       'click .add-group' : 'addGroup',
       'dragstart .contact-row': 'contactStartDrag',
       'dragover .group': 'preventDefault',
       'dragleave .group': 'contactDragLeave',
       'dragenter .group': 'contactDragEnter',
       'drop .group': 'contactDropped'
    },

    preventDefault: function(ev){
        ev.preventDefault();
        ev.stopPropagation();
    },

    contactStartDrag: function(ev){
        var $contactRow = $(ev.target);
        var unique_id = $contactRow.data('id');
        ev.originalEvent.dataTransfer.setData("contact_id", unique_id);
    },

    contactDragEnter: function(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        var $group = $(ev.target);
        if($group.hasClass('group-drag-hover'))
            return;

        $group.addClass('group-drag-hover');
    },

    contactDragLeave: function(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        var $group = $(ev.target);
        if(!$group.hasClass('group-drag-hover'))
            return;

        $group.removeClass('group-drag-hover');
    },

    contactDropped: function(ev) {
        ev.preventDefault();
        var $group = $(ev.target);
        var id = $group.data('id');
        var group = this.groupList.getById(id);

        if(group.length > 0){
            var contact_unique_id = ev.originalEvent.dataTransfer.getData("contact_id");
            var contact = this.contactList.getById(contact_unique_id);
            if(contact.length > 0)
                this.addContactToGroup(contact[0], group[0]);
        }

        $group.removeClass('group-drag-hover');
    },

    render: function(options) {
        this.hidePanels();
        $('#contact-list').show();

        if(!this.first_time){
            return;
        }
        this.contactList = options.contactList;
        this.groupList = options.groupList;

        this.listenTo(this.contactList, 'add', this.addContact);
        this.listenTo(this.contactList, 'remove', this.removeContact);

        this.clearTemplate();

        var groupsTable =$('.groups_table');
        var contactTable =$('#contacts_table');
        contactList.each(function(contact){
            contactTable.append(new ContactItemView({model: contact}).render().el);
        });

        this.groupListView = new GroupListView();
        groupsTable.html(this.groupListView.render({groupList: this.groupList}));

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
    },

    addContactToGroup: function(contact, group){
        $.ajax({
            url: "/api/group/" + group.attributes.unique_id+ "/"+ contact.attributes.unique_id + "?user_id=" + currentUser.id,
            type: "POST",
            contentType: "application/json",
            success: function(unique_id) {
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: "The contact couldn't be added to the group"
                }]);
            }
        });
    },

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
       this.$el.html(this.template(this.model.toJSON()));
       return this;
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