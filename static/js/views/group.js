GroupListView = Backbone.View.extend({
    template: JST['group.html'],
    events: {
       'dragover .group': 'contactDragOver',
       'dragenter .group': 'contactDragEnter',
        'dragleave .group': 'contactDragLeave',
       'drop .group': 'contactDropped'
    },

    newGroupView: null,

    render: function(options) {
        this.groupList = options.groupList;
        this.contactList = options.contactList;

        this.$el.html(this.template({groupList: this.groupList.collectionToJSON()}));
        this.$groupsTable = this.$el.find('.groups');

        this.listenTo(this.groupList, 'add', this.newGroupAdded);
        this.listenTo(this.groupList, 'remove', this.removedGroup);

        this.newGroupView = new GroupCreateView();
        this.$el.append(this.newGroupView.render({groupList: this.groupList}));
        return this.$el;
    },
    
    showDialog: function () {
        this.newGroupView.show();
    },

    newGroupAdded: function(group){
        console.log(group);
        var color = randomColor();
        var inverse = colorInverter(color);
        this.$groupsTable.prepend('<div data-id="{0}" class="group col-md-1" style="background-color: #{2};color: #{3}">{1}</div>'.format(
            group.attributes.unique_id,
            cut(group.attributes.name),
            color,
            inverse
        ));
    },

    removedGroup: function(){

    },

    contactDragEnter: function(ev) {
        ev.preventDefault();

        var $group = $(ev.target);
        if($group.hasClass('group-drag-hover'))
            return;

        $group.addClass('group-drag-hover');
    },
    contactDragLeave: function(ev) {
        ev.preventDefault();

        var $group = $(ev.target);
        if(!$group.hasClass('group-drag-hover'))
            return;

        $group.removeClass('group-drag-hover');
    },
    contactDragOver: function(ev) {
        ev.preventDefault();
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

        //$group.removeClass('group-drag-hover');
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

GroupCreateView = Backbone.View.extend({
    template: JST['add-group.html'],

    events: {
       'click .new-group-btn' : 'newGroup',
       'keyup .new-group-input' : 'newGroupKeyEvent',
    },

    render: function(options) {
        this.groupList = options.groupList;

        this.$el.html(this.template());
        this.$groupInput = this.$el.find('.new-group-input');

        return this.$el;
    },

    show: function () {
        this.$el.find('.addGroup-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });

        this.$groupInput.focus();
    },

    newGroupKeyEvent: function(evt) {
        if (evt.keyCode != 13) {
            return;
        }
        this.newGroup();
    },

    newGroup: function(){
        var that = this;
        var name = this.$groupInput.val();
        if(name == ''){
            alert_notification([{alertType: 'warning', message: 'Type a name for the group!'}]);
            return;
        }

        this.$el.hide();

        $.ajax({
            url: "/api/group/" + name + "?user_id="+currentUser.id,
            type: "POST",
            success: function(data) {
                alert_notification([{alertType: 'success', message: 'Group Added!'}]);
                that.groupList.add(new Group(data));
            },
            error: function(data) {
                alert_notification([{alertType: 'danger', message: 'Problem adding the Group!'}]);
            }
        });

    }

});