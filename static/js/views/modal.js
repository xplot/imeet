ModalView = Backbone.View.extend({
    childView: null,
    template: null,

    initialize: function(options){
        this.options = options || {};
        this.childView = this.options.childView;
        this.template = this.options.template;

        if(Backbone.pubSub._events == null || Backbone.pubSub._events['childClose'] == null)
            Backbone.pubSub.on('childClose', this.onChildClose, this);
    },
    render: function(data){
        var this_el = this.$el;
        var that = this;

        if(this.options.templateId != null){
            var template = _.template( $(this.options.templateId).html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        }
        else if(this.template != null)
          this.$el.html(this.template());

        if(this.childView != null){
            this.childView.render(data);
        }

        this.$el.find(".close-modal").click(function(e) {
            that.onChildClose({
                'view': that.childView
            });
        });

        //Finally we show it
        this.$el.modal('show');
        //this.$el.on('hidden.bs.modal', this.onChildClose);
        return this;
    },

    onChildClose:function(data){
        if(this.$el != null)
            this.$el.modal('hide');
        Backbone.history.navigate('',true);
    }

});
