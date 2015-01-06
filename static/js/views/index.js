IndexView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click .imeet-btn' : 'createNew',
       'keypress .invite-title-input' : 'type_key'
    },

    type_key: function(e){
        if (e.keyCode == 13) {
            this.createNew();
            e.preventDefault();
            return false;
        }
    },

    render: function (data) {
        $('#view-container').hide();
        this.$el.show();

        this.$inviteTitle = this.$el.find('.invite-title-input');
        this.$headerImage = this.$el.find('.header-section');
    },

    createNew: function(){

        var viewName = this.$inviteTitle.val();
        if(viewName != null && viewName != '')
            Backbone.history.navigate('/new/'+ viewName, true);
        else
            alert('type a title!');
    }
});