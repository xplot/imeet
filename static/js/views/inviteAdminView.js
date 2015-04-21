InviteAdminView = SimpleView.extend({
    template: JST['invite_admin.html'],
    inviteId:null,
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

    render: function(data){
        this.hidePanels();
        this.model = new InviteModel(data);

        this.unique_id = data.unique_id;

        if(this.unique_id== null)
            console.error('Invite Id is null, check routing');

        var invite_json = this.model.toJSON();

        this.$el.html(this.template(invite_json));

        var invite_admin_attendees = new InviteAdminAttendeesView();
        var invite_header = new InviteHeaderView({is_admin: true});
        var invite_details = new InviteDetailsView();

        invite_admin_attendees.render(
            {
                invite_id: data.unique_id,
                attendees: this.model.get('attendees')
            }
        );
        invite_header.render(this.model);
        invite_details.render(this.model);

        this.plugins();
    },

    notifyAll: function(){
        this.model.notifyAll($.proxy(this.notifyAllCallback, this));
    },
    notifyAllCallback:function(result){
        alert_notification([{
            alertType:'success',
            message: "Everyone in the invite is going to be notified in the next few minutes"
        }]);
    },


    plugins: function(){

    },

});
