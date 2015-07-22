
InviteConfirmationView = SimpleView.extend({

    template: JST['invite_confirmation.html'],

    initialize: function(options){
        this.options = options || {};
    },

    render: function (options) {
        return this.$el.html(this.template());
    }
});