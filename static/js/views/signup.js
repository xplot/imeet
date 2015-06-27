UserRegisterView = SimpleView.extend({
    template: JST['register.html'],
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .submit-register' : 'registerEmail',
        'keyup .register-email': 'registerEnter'
    },

    render: function() {
        this.hidePanels();

        this.$el.html(this.template());
        this.$email = this.$el.find('.register-email');
        this.plugins();

        this.$email.focus();
    },

    registerEnter: function(evt) {
        if (evt.keyCode != 13) {
            return;
        }
        this.registerEmail();
    },

    registerEmail: function(){
        if(!validator.validateItem(this.$email)){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        var that = this;
        httpRequest({
            url: "/register/email/"+ this.$email.val(),
            type: "POST",
            cache: false,
            success: function(data) {
                alert_notification([{
                    alertType:'success',
                    message: "Account Created Successfully, please check your email"
                }]);

                that.$email.val('');
            }
        });

    },

    plugins: function(){
        var that = this;
        that.block('.register-background', 'half');

        $(window).resize(function() {
            that.block('.register-background', 'half');

        });
    }
});