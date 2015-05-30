ProfileEditView = SimpleView.extend({
    template: JST['profile_edit.html'],
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .save-profile' : 'save'
    },

    render: function() {
        this.hidePanels();

        this.$el.html(this.template());

        this.$name = this.$el.find('#edit-profile-name');
        this.$username = this.$el.find('#edit-profile-username');
        this.$password = this.$el.find('#edit_profile_password');
        this.$password_confirm = this.$el.find('#edit_profile_password_confirm');
        this.$email = this.$el.find('#edit-profile-email');

        var that = this;
        $.ajax({
            url: "/api/profile/"+ currentUser.id,
            type: "GET",
            cache: false,
            success: function(data) {
                console.log(data);
                if(data.email != null){
                    that.$email.html(data.email);
                    that.$email.parent().addClass('floating-label-form-group-with-value');
                }

                if(data.username != null){
                    that.$username.val(data.username);
                    that.$username.parent().addClass('floating-label-form-group-with-value');
                }

                if(data.name != null){
                    that.$name.val(data.name + " " + data.last_name);
                    that.$name.parent().addClass('floating-label-form-group-with-value');
                }
            }
        });

    },

    save: function(){
        if(!validator.validateItems('.valid-before-submit'))
            return;

        if(this.$password.val() != null && (this.$password.val() != this.$password_confirm.val())){
            alert_notification([{alertType: 'warning', message: "Password and Password confirm don't match!!!"}]);
        }

        var user = {
          'username':   this.$username.val(),
        };

        user.name = this.$name.val().split(' ')[0];
        user.last_name = this.$name.val().split(' ')[1];

        if(this.$password.val() != null && this.$password.val() != '')
            user.password = this.$password.val();

        var that = this;
        $.ajax({
            url: "/api/profile/"+ currentUser.id,
            type: "POST",
            data: JSON.stringify(user),
            cache: false,
            success: function(data) {
                Backbone.history.navigate('/search', true);
            }
        });

    }
});
