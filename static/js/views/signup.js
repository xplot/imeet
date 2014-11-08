UserRegisterView = Backbone.View.extend({
    template: JST['register.html'],
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .submit-register' : 'registerEmail'
    },

    render: function() {
        this.$el.html(this.template());

        this.$registerForm = this.$el.find('#registerForm');
        this.$email = this.$el.find('.register-email');
    },

    registerEmail: function(){
        this.$registerForm.validate();
        if(!this.$registerForm.valid())
            return;

        var that = this;
        $.ajax({
            url: "/register/email/"+ this.$email.val(),
            type: "POST",
            cache: false,
            success: function() {
                Backbone.pubSub.trigger('childClose', { 'view' : that } );
            },
            error:function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });

    }
});