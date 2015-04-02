InviteHeaderView = SimpleView.extend({
    template: JST['invite_header.html'],

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    events: {

    },

    render: function(invite_model){
        this.model = invite_model;
        var invite_json = this.model.toJSON();
        this.$el.html(this.template(invite_json));
    },
});
