AdminInviteView = SimpleView.extend({
    template: JST['admin_edit.html'],
    inviteId:null,
    author: "Organizer",
    contacts: null,

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    events: {
        "keypress .invite-newComment": "addNewComment",
        'change .share_to_facebook': 'share_on_facebook_auth',
    },

    render: function(data){
        this.hidePanels();
        this.model = new InviteModel(data);

        this.inviteId = data.invite_id;

        if(this.inviteId == null)
            console.error('Invite Id is null, check routing');

        var invite_json = this.model.toJSON();

        this.$el.html(this.template(invite_json));

        var invite_attendees = new InviteAttendeesView({
            el:'#invite-attendees'
        });
        var invite_header = new InviteHeaderView({
            el:'#invite-header'
        });
        var invite_edit_details = new InviteEditDetailsView({
            el:'#invite-edit'
        });

        invite_attendees.render({contacts: data.contacts});
        invite_header.render(this.model);
        invite_edit_details.render(this.model);

        this.plugins();
    },

    plugins: function(){

    },

});
