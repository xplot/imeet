InviteAdminView = SimpleView.extend({
    template: JST['invite_admin.html'],
    author: "Organizer",
    contacts: null,

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    events: {
        "keypress .invite-newComment": "addNewComment",
        'click .notify-all': 'notifyAll',
        'change .share_to_facebook': 'share_on_facebook_auth',
    },

    hidePanels:function(){
        //We hide all view containers
        $('#body-container').hide();
        $('#view-container').hide();
        $('#modal_container').hide();
        $('#invite-body').show();
    },

    render: function(unique_id, invite){
        this.hidePanels();
        this.unique_id = unique_id;

        if(this.unique_id== null)
            console.error('Invite Id is null, check routing');

        if(invite == null){
            var inviteModel = new InviteModel({unique_id: this.unique_id});
            inviteModel.fetch($.proxy(this.render, this));
            return;
        }

        this.validateInviteIsCurrent(invite.start);

        this.model = new InviteModel(invite);
        var invite_json = this.model.toJSON();
        this.$el.html(this.template(invite_json));

        var invite_admin_attendees = new InviteAdminAttendeesView();
        var invite_header = new InviteHeaderView({is_admin: true});
        var invite_details = new InviteDetailsView();
        var invite_comments = new InviteCommentsView();

        invite_admin_attendees.render({
            invite_id: this.unique_id,
            attendees: this.model.get('attendees')
        });
        invite_header.render(this.model);
        invite_details.render(this.model);
        invite_comments.render({
            invite_id: this.unique_id,
            current_attendee: this.current_attendee,
            comments: new CommentList(invite.comments)
        });

        this.plugins();
    },

    notifyAll: function(){
        this.model.notifyAll($.proxy(this.notifyAllCallback, this));
    },
    notifyAllCallback:function(result){
        alert_notification([{
            alertType:'success',
            message: "Everyone in the invite is going to be notified in the next few minutes"
        }],5000
        );
    },

    plugins: function(){
        var that = this;
        that.block('.invite-background', 'half');

        $(window).resize(function() {
            that.block('.invite-background', 'half');

        });
    },

    validateInviteIsCurrent: function(start){
        var moment_obj = moment(start);
        var now = moment();

        if(moment_obj < now)
        {
            alert_notification([{
                alertType:'warning',
                message: "This invite is in the Past you cannot edit it anymore"
            }], 5000);
        }
    }

});