LoginView = SimpleView.extend({
    template: JST['login.html'],

    events: {
       'click .signup' : 'gotoRegister'
    },

    render: function(options) {
        this.hidePanels();

        this.$el.html(this.template());
    },

    gotoRegister: function(){
        Backbone.history.navigate('register', true);
    }
});
