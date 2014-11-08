SimpleView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },

    render: function (data) {
        //We hide all view containers
        $('#body-container').hide();

        if (this.options.templateId != null) {
            var template = _.template($(this.options.templateId).html(), {});
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
            this.$el.show();
        }
    }
});










