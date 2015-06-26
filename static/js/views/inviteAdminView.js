InviteAdminView = SimpleView.extend({
    template: JST['invite_admin.html'],
    author: "Organizer",
    contacts: null,
    current_attendee: null,

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

    render: function(unique_id, invite, invite_attendee){
        this.hidePanels();
        this.unique_id = unique_id;

        if(this.unique_id== null)
            console.error('Invite Id is null, check routing');

        this.validateInviteIsCurrent(invite.start);

        this.model = invite;
        this.current_attendee = invite_attendee;

        var invite_json = this.model.toJSON();
        this.$el.html(this.template(invite_json));

        var invite_attendees_view = new InviteAttendeesView();
        var invite_description = new InviteDescriptionView({el: "#invite-description"});
        var invite_header = new InviteHeaderView({is_admin: true});
        var invite_details = new InviteDetailsView({is_admin: true});
        var invite_comments = new InviteCommentsView();
        var invite_attendee_create = new InviteAttendeeCreateView();

        var invite_attendees = this.model.get('attendees');

        invite_attendees_view.render({
            invite_id: this.unique_id,
            attendees: invite_attendees,
            current_attendee: this.current_attendee,
            edit_view: true
        });
        invite_description.render(this.model);
        invite_header.render(this.model);
        invite_details.render(this.model);
        invite_comments.render({
            invite_id: this.unique_id,
            current_attendee: this.current_attendee,
            comments: new CommentList(invite.get('comments'))
        });

        invite_attendee_create.render(
            this.unique_id,
            invite_attendees
        );

        $('.invite-description').html(invite.description);

        var invite_palette = this.model.get('palette');
        if(invite_palette != null)
        {
            var palette = new PaletteView();
            palette.renderPalette(new PaletteModel(invite_palette));
        }

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
    },



});
