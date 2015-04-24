GroupListView = Backbone.View.extend({

    events: {
       'dragover .group-drop-area': 'contactDragOver',
       'dragenter .group-drop-area': 'contactDragEnter',
       'dragleave .group-drop-area': 'contactDragLeave',
       'drop .group-drop-area': 'contactDropped',
    },

    newGroupView: null,


    render: function(options) {
        this.groupList = options.groupList;
        this.contactList = options.contactList;

        var that = this;
        var index = 0;
        if(groupList.length > 0)
            this.groupList.forEach(function(group){
                var group_json = group.toJSON2();
                group_json.panel_class = (false && index%2 == 0)? 'group-panel-even':'group-panel-odd';
                that.$el.append(JST['group-item.html'](group_json));
                index++;
            });
        else{
            that.$el.append("<div class='empty-groups'>You have no groups. Create one!</div>");
        }

        this.$groupsTable = this.$el;

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
        $('empty-groups').hide();

        var group_json = group.toJSON();
        group_json.panel_class = (this.groupList.length%2 == 0)? 'group-panel-even':'group-panel-odd';
        this.$el.prepend(JST['group-item.html'](group_json));
    },

    removedGroup: function(){

    },

    contactDragEnter: function(ev) {
        ev.preventDefault();

        var $item = $(ev.target);
        if($item.hasClass('group-drag-hover') ||!$item.hasClass('group-drop-area'))
            return;

        $item.addClass('group-drag-hover');
    },
    contactDragLeave: function(ev) {
        ev.preventDefault();

        var $item = $(ev.target);
        if(!$item.hasClass('group-drag-hover') ||!$item.hasClass('group-drop-area'))
            return;

        $item.removeClass('group-drag-hover');
    },
    contactDragOver: function(ev) {
        ev.preventDefault();
    },

    contactDropped: function(ev) {
        var $group = $(ev.target);

        if(!$group.hasClass('group-drop-area'))
            return;
        ev.preventDefault();
        ev.stopPropagation();

        var id = $group.data('id');
        var group = this.groupList.getById(id);

        if(group != null){
            var contact_unique_id = ev.originalEvent.dataTransfer.getData("contact_id");

            var contact = this.contactList.getById(contact_unique_id);
            if(contact != null)
                this.addContactToGroup(contact, group);
        }

        $group.removeClass('group-drag-hover');
    },

    addContactToGroup: function(contact, group){
        $.ajax({
            url: "/api/group/" + group.attributes.unique_id+ "/"+ contact.attributes.unique_id + "?user_id=" + currentUser.id,
            type: "POST",
            contentType: "application/json",
            success: function(data) {
                $('#groupbox_'+ group.get('unique_id')).append('<div class="col-md-5 group-contact">' + cut(contact.get('name'),8) + '</div>')
            },
            error: function(data) {
                console.log(data);
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
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

    hide: function () {
        this.$el.find('.addGroup-modal').hide();
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

        this.hide();

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