LoginView = SimpleView.extend({
    render: function(options) {
        this.hidePanels();

        if (this.options.templateId != null) {
            var template = _.template($(this.options.templateId).html(), {});
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
            this.$el.show();
        }
    }
});
