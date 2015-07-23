var _contactCreateView = null;
function contactCreateView(){
    if(_contactCreateView == null)
        _contactCreateView = new ContactDetailsView();
    return _contactCreateView;
}

ContactsView = SimpleView.extend({
    first_time: true,
    el: "#contact-list",
    template: JST['contacts.html'],

    initialize: function (options) {
        this.options = options || {};
    },
    events: {
        'click .add-contact' : 'addContact',
        'change #import-csv' : 'importFromCsv',
        'click .navigate-to-groups' : 'navigateToGroups',
        'click .add-to-group' : 'addToGroup',
        'click .contact-row' : "editRow",
        'click .delete-contact': "deleteRow"
    },

    render: function(options) {

        this.contactList = options.contactList;
        this.groupList = options.groupList;

        this.listenTo(this.contactList, 'add', this.addContactHook);
        this.listenTo(this.contactList, 'remove', this.removeContactHook);
        this.listenTo(this.contactList, 'change', this.changeContactHook);

        this.$el.html(this.template({
            contacts: this.contactList.collectionToJSON()
        }));

        this.first_time = false;
    },

    addContactHook: function(contact){
        var contactTable =$('#contacts_table');
        contactTable.append(new ContactItemView({model: contact}).render().el);
    },

    removeContactHook: function(data){
        var $contact_row = $('div[data-id="'+ data.get('unique_id') + '"');
        $contact_row.remove();
    },

    changeContactHook: function(contact){
        var $contact_row = $('div[data-id="'+ contact.get('unique_id') + '"');
        $contact_row.html($(JST['contact_item.html'](contact.toJSON())).html());
    },

    addContact: function(evt){
        evt.preventDefault();

        this.contactCreateView = new ContactDetailsView();
        this.contactCreateView.render(null, this.contactList);
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
                    data: '{"user_id" : "{0}", "file_name": "{1}", "file": "{2}"}'.format(currentUser.id,
                                                                                          theFile.name,
                                                                                          e.target.result),
                    cache: false,
                    success: function() {
                        /*alert_notification([{
                            alertType:'success',
                            message: 'Contact created!'
                        }]);*/

                        location.reload();

                        console.info("file uploaded correctly.");
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

     navigateToGroups: function(){
        Backbone.history.navigate('groups', true);
    },

    editRow: function(evt){
        evt.preventDefault();

        var id = $(evt.target).data('id');
        if(id != null){
            evt.stopPropagation();
        }
        else
            return;

        var contactModel = this.contactList.getById(id);
        this.contactCreateView = new ContactDetailsView();
        this.contactCreateView.render(contactModel, null);
    },

    deleteRow: function(evt){
        evt.preventDefault();
        evt.stopPropagation();

        var id = $(evt.target).data('id');

        var contactModel = this.contactList.getById(id);
        contactModel.deleteContact();

        $('.contact-row[data-id="' + id + '"]').remove();
    }

});

ContactDetailsView = Backbone.View.extend({
    template: JST['contact_details.html'],
    el: "#new-contact-container",
    createMode: true,
    mainContactList: null,
    groupSearchView : null,

    events: {
        'click .new-contact-btn' : 'newContact',
        'keyup #nameInput': 'inputEnter',
        'keyup #phoneInput': 'inputEnter',
        'keyup #emailInput': 'inputEnter'
    },

    getGroupSearchView: function(){
        if(this.groupSearchView == null)
            this.groupSearchView = new GroupSearchView({
                el: ".contact-groups"
            });
        else{
            var groups = this.groupSearchView.all_groups;
            this.groupSearchView = new GroupSearchView({
                el: ".contact-groups"
            });
            this.groupSearchView.all_groups = groups;
        }
        return this.groupSearchView;
    },

    render: function(contactModel, mainContactList) {
        this.mainContactList = mainContactList;

        this.createMode = contactModel == null;

        this.model = contactModel || new Contact();

        this.$el.html(this.template({
            createMode: this.createMode,
            contact: this.model.toJSON()
        }));

        if(!this.createMode){ //Group management only on Update
            var groupSearchView = this.getGroupSearchView();
            groupSearchView.render(contactModel, false);
        }

        this.$el.find('.addContact-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });

        return this.$el;
    },

    show: function () {
        this.$el.find('.addContact-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });
    },

    hide: function () {
        this.$el.find('.addContact-modal').modal('hide');
    },

    inputEnter: function(evt){
        if (evt.keyCode != 13) {
            return;
        }
        this.newContact();
    },

    newContact: function(){
        if(!validator.validateItems('.contact_input')){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        this.model.set('name', $("#nameInput").val());
        this.model.set('email', $("#emailInput").val());
        this.model.set('phone', $("#phoneInput").val());

        if(this.createMode)
            this.model.create($.proxy(this.contactCreated, this));
        else
            this.model.update($.proxy(this.contactUpdated, this));
    },

    contactCreated: function(data){
        var message = "Contact created!";

        alert_notification([{
            alertType:'success',
            message: message
        }], 5);

        this.$el.find('.empty-contacts').remove();

        this.model.set("unique_id", data);

        if(this.mainContactList != null)
            this.mainContactList.add(this.model);

        this.hide();
    },

    contactUpdated: function(data){
        var message = "Contact updated!";

        alert_notification([{
            alertType:'success',
            message: message
        }], 5);

        this.hide();
    },


});

ContactItemView = SimpleView.extend({
    template: JST["contact_item.html"],
    editTemplate: JST["contact_item_edit.html"],
    model: null,
    editMode: false,


    events: {
       'dragstart .contact-row': 'enterDragMode',
       'click .contact-row' : "edit",
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
});

AttendeeDetailsView = Backbone.View.extend({
    template: JST['contact_details.html'],
    el: "#new-contact-container",
    invite_id: null,

    events: {
       'click .new-contact-btn' : 'updateAttendee',
    },

    render: function(invite_id, attendeeModel) {
        this.invite_id = invite_id;
        this.model = attendeeModel ;

        this.$el.html(this.template({
            createMode: false,
            contact: this.model.toJSON()
        }));

        this.$el.find('.addContact-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });

        return this.$el;
    },

    show: function () {
        this.$el.find('.addContact-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });
    },

    hide: function () {
        this.$el.find('.addContact-modal').modal('hide');
    },

    updateAttendee: function(){
        if(!validator.validateItems('.contact_input')){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        this.model.set('name', $("#nameInput").val());
        this.model.set('email', $("#emailInput").val());
        this.model.set('phone', $("#phoneInput").val());

        if(currentUser == null || this.model.get('unique_id') != '') //Contact Exists
            this.model.updateAttendee(this.invite_id, $.proxy(this.attendeeUpdated, this));
        else{
            this.model.create($.proxy(this.updateAttendee, this));
        }
    },

    attendeeUpdated: function(data){
        var message ="Attendee updated!";

        alert_notification([{
            alertType:'success',
            message: message
        }], 5);

        this.model.set("unique_id", data);

        this.hide();

    },
});

GroupSearchView = Backbone.View.extend({
    template: JST["group_search.html"],
    model: null,
    searchMode: false,
    all_groups: null,

    events: {
        'click .add-to-group' : "addToGroup",
        'keyup .group-input': 'groupInputEnter'
    },

    render: function(contact, searchMode){
        this.model = contact;

        var json = {
            searchMode: searchMode,
            contact: this.model.toJSON()
        };

        this.$el.html(this.template(json));

        this.$newGroup = $('.group-input');

        var that = this;
        if(this.all_groups == null){
            var groupModel = new Group();
            groupModel.fetchAllGroups(function(groups){

                that.all_groups = new GroupList(groups);
                that.setupGroupsTypeahead();
                that.$newGroup.focus();
            });
        }
        else{
            that.setupGroupsTypeahead();
            that.$newGroup.focus();
        }

        return this;
    },

    groupInputEnter: function(evt) {
        if (evt.keyCode != 13) {
            return;
        }
        this.groupSelected();
    },

    groupSelected: function() {
        var group = this.selectedGroup;

        if(group != null){
            this.model.get('groups').push(group);
            this.model.addToGroup(group.unique_id, $.proxy(this.contactIncludedInGroup, this));

        }
    },

    contactIncludedInGroup: function(){
        this.render(this.model, false);
    },

    addToGroup: function(evt){
        this.render(this.model, true);
    },

    setupGroupsTypeahead: function(){
        var that = this;

        var substringGroupMatcher = function(groups) {
            return function findMatches(q, cb) {
                var matches, substrRegex;
                matches = [];
                substrRegex = new RegExp(q, 'i');

                groups.each(function(group) {
                    if (substrRegex.test(group.get('name'))){
                        group.set('is_group', true);
                        matches.push(group.toJSON());
                    }
                });
            cb(matches);
            };
        };

        var setupTypeAhead = function(groups){
            that.$newGroup.typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
            },
            {
                autoselect: true,
                name: 'groups',
                displayKey: 'name',
                source: substringGroupMatcher(groups),
                templates: {
                    suggestion: JST['group_item_typeahead.html']
                }

            }
            ).on('typeahead:selected', function (obj, group) {
                that.selectedGroup = group;
                that.groupSelected();
            })
            .on('keypress keydown input', function($e) {
                $e.stopPropagation();
            });
        };

        setupTypeAhead(that.all_groups);
    },

});
