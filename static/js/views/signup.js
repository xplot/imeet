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
        this.$email = this.$el.find('.register-email');
    },

    registerEmail: function(){
        if(!validator.validateItem(this.$email)){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        var that = this;
        $.ajax({
            url: "/register/email/"+ this.$email.val(),
            type: "POST",
            cache: false,
            success: function(data) {
                alert_notification([{
                    alertType:'success',
                    message: "Account Created Successfully, please check your email"
                }]);
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