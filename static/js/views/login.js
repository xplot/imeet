LoginView = SimpleView.extend({
    template: JST['login.html'],

    render: function(options) {
        this.hidePanels();

        this.$el.html(this.template());
    }
});
