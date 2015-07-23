GroupsView = Backbone.View.extend({
    first_time: true,
    el: "#contact-list",
    template: JST['groups.html'],

    events: {
        'click .add-group' : 'addGroup',
        'click .navigate-to-contacts' : 'navigateToContacts',
        'click .group-row' : "editRow",
        'click .delete-group': "deleteRow"
    },

    newGroupView: null,

    render: function(options) {

        this.groupList = options.groupList;

        this.listenTo(this.groupList, 'add', this.addGroupHook);
        this.listenTo(this.groupList, 'remove', this.removeGroupHook);
        this.listenTo(this.groupList, 'change', this.changeGroupHook);

        this.$el.html(this.template({
            groups: this.groupList.collectionToJSON()
        }));

        this.first_time = false;
    },

    addGroup: function(evt){
        console.log("here");
        evt.preventDefault();


        this.groupCreateView = new GroupDetailsView();
        this.groupCreateView.render(null, this.groupList);
    },

    addGroupHook: function(group){
        var groupTable =$('#groups_table');
        groupTable.append(new GroupItemView({model: group}).render().el);
    },

    changeGroupHook: function(group){
        var $group_row = $('div[data-id="'+ group.get('unique_id') + '"');
        $group_row.html($(JST['group_item.html'](group.toJSON())).html());
    },

    navigateToContacts: function(){
        Backbone.history.navigate('contacts', true);
    },

    editRow: function(evt){
        evt.preventDefault();

        var id = $(evt.target).data('id');
        if(id != null){
            evt.stopPropagation();
        }
        else
            return;

        var groupModel = this.groupList.getById(id);
        this.groupCreateView = new GroupDetailsView();
        this.groupCreateView.render(groupModel, null);
    },

    deleteRow: function(evt){
        evt.preventDefault();
        evt.stopPropagation();

        var id = $(evt.target).data('id');

        var groupModel = this.groupList.getById(id);
        alert('Not implemented yet');


        //groupModel.deleteGroup();
        //$('.contact-row[data-id="' + id + '"]').remove();
    }

});

GroupDetailsView = Backbone.View.extend({
    template: JST['group_details.html'],
    el: "#new-group-container",
    createMode: true,
    mainGroupList: null,

    events: {
        'click .new-group-btn' : 'newGroup',
        'keyup .group_input': 'inputEnter',
    },

    render: function(groupModel, mainGroupList) {
        this.mainGroupList = mainGroupList;

        this.createMode = groupModel == null;

        this.model = groupModel || new Group();

        this.$el.html(this.template({
            createMode: this.createMode,
            group: this.model.toJSON()
        }));

        this.$el.find('.addGroup-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });

        return this.$el;
    },

    show: function () {
        this.$el.find('.addGroup-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });
    },

    hide: function () {
        this.$el.find('.addGroup-modal').modal('hide');
    },

    inputEnter: function(evt){
        if (evt.keyCode != 13) {
            return;
        }
        this.newGroup();
    },

    newGroup: function(){
        if(!validator.validateItems('.group_input')){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        this.model.set('name', $("#nameInput").val());

        if(this.createMode)
            this.model.create($.proxy(this.groupCreated, this));
        else
            this.model.update($.proxy(this.groupUpdated, this));
    },

    groupCreated: function(data){
        var message = (this.createMode)?"Group created!": "Group updated!";

        alert_notification([{
            alertType:'success',
            message: message
        }], 5);

        this.$el.find('.empty-groups').remove();

        this.model.set("unique_id", data);

        if(this.mainGroupList != null)
            this.mainGroupList.add(this.model);

        this.hide();

    },

    groupUpdated: function(data){
        var message = "Group updated!";

        alert_notification([{
            alertType:'success',
            message: message
        }], 5);

        this.hide();
    }
});

GroupItemView = SimpleView.extend({
    template: JST["group_item.html"],
    editTemplate: JST["group_item_edit.html"],
    model: null,
    editMode: false,


    events: {
//       'dragstart .contact-row': 'enterDragMode',
       'click .group-row' : "edit",
       'click .finish-edit' : "finishEditMode",
    },

    render: function(){
       this.$el.html(this.template(this.model.toJSON()));
       return this;
    },

//    enterDragMode: function(ev){
//        //ev.preventDefault();
//        //ev.stopPropagation();
//        var unique_id = this.model.get('unique_id');
//        ev.originalEvent.dataTransfer.setData("contact_id", unique_id);
//    },

    edit: function(evt){
        evt.preventDefault();
        this.groupCreateView = groupCreateView();
        this.groupCreateView.render(this.model);

    },

});