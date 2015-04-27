SearchView = SimpleView.extend({
    template: JST['invite_search.html'],

    initialize: function(options){
        this.options = options || {};
    },
    events: {
        'click .search' : 'search_value',
        'keypress #searchBox' : 'type_key',
        'click .btn-duplicate' : 'duplicate',
        'click .btn-edit' : 'edit',
        'click .btn-cancel' : 'cancel',
        'click .invite-link': 'navigate'
    },

    render: function(invites) {
        this.hidePanels();
        this.model = invites;

        if(this.model != null) {
            this.$el.html(this.template({
                'invites': this.model.collectionToJSON()
            }));
        }
        else{
            this.$el.html(this.template({
                'invites': {}
            }));
            this.search();
        }
    },

    type_key: function(e){
        if (e.keyCode == 13) {
            var $searchBox = this.$el.find('#searchBox');
            this.search($searchBox.val());
            e.preventDefault();
            return false;
        }
    },
    search_value: function(evt){
        var $searchBox = this.$el.find('#searchBox');

        this.search($searchBox.val());
    },

    search: function(value){
        var that = this;
        var url = "/api/invite/search/"+ currentUser.id + "?term=";
        if(value != null)
            url += value;

        $.ajax({
            url: url,
            type: "GET",
            cache: false,
            success: function(data) {
                var invite_list = new InviteList();
                if(data!=null){
                    data.forEach(function(invite){
                        invite_list.add(new InviteModel(invite));
                    });

                }
                that.render(invite_list);
            }
        });
    },

    duplicate: function(evt){
        var $btn = $(evt.target);
        var invite_id = $btn.data('id');
        Backbone.history.navigate('new/from/' + invite_id, true);
    },

    edit: function(evt){
        var $btn = $(evt.target);
        var invite_id = $btn.data('id');
        Backbone.history.navigate('invite/' + invite_id + "/edit", true);
    },

    navigate: function(evt){
        var $btn = $(evt.target);
        var invite_id = $btn.data('id');
        Backbone.history.navigate('invite/' + invite_id, true);
    },

    cancel: function(evt){
        alert("not ready yet");
    }
});