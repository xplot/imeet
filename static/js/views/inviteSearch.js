SearchView = SimpleView.extend({
    template: JST['invite_search.html'],

    initialize: function(options){
        this.options = options || {};
    },
    events: {
        'click .search' : 'search_value',
        'keypress #searchBox' : 'type_key',
        'click .btn-duplicate' : 'duplicate',

        'click .btn-yes' : 'rsvpYes',
        'click .btn-no' : 'rsvpNo',

        'click .btn-edit' : 'edit',
        'click .btn-cancel' : 'cancel',
        'click .invite-background': 'navigate'
    },

    render: function(invites, search) {

        var paletteView = new PaletteView();
        paletteView.clearPalette();

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

        if(search != null){
            var $searchBox = this.$el.find('#searchBox');
            $searchBox.val(search);
            $searchBox.focus();
        }

        this.plugins();
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

        if(currentUser == null)
            console.error("Current User cannot be null on this view!");

        var that = this;
        var url = "/api/invite/?term=";
        if(value != null)
            url += value;

        httpRequest({
            url: url,
            type: "GET",

            success: function(data) {
                var invite_list = new InviteList();
                if(data!=null){
                    data.forEach(function(invite){
                        invite_list.add(new InviteModel(invite));
                    });
                }
                that.render(invite_list, value);
            }
        });
    },

    duplicate: function(evt){
        evt.preventDefault();
        evt.stopPropagation();

        var $btn = $(evt.target);
        var invite_id = $btn.data('id');
        Backbone.history.navigate('new/from/' + invite_id, true);
    },

    edit: function(evt){
        evt.preventDefault();
        evt.stopPropagation();

        var $btn = $(evt.target);
        var invite_id = $btn.data('id');
        Backbone.history.navigate('invite/' + invite_id + "/edit", true);
    },

    navigate: function(evt){
        console.log(evt);
        var $btn = $(evt.target);
        var invite_id = $btn.data('id');
        Backbone.history.navigate('invite/' + invite_id, true);
    },

    cancel: function(evt){
        alert("not ready yet");
    },

    plugins: function(){
        var that = this;
        that.block('.invite-background', 'half');

        $(window).resize(function() {
            that.block('.invite-background', 'half');

        });
    },

    rsvpYes: function(evt){
        this.rsvp(evt, 'yes');
    },
    rsvpNo: function(evt){
        this.rsvp(evt, 'no');
    },

    rsvp: function(evt, response){
        evt.preventDefault();
        evt.stopPropagation();

        var $btn = $(evt.target);
        var invite_attendee_id = $btn.data('attendee_id');

        var attendee_model = new Contact({invite_attendee_id: invite_attendee_id});
        attendee_model.acknowledgeInvite(response, $.proxy(this.attendeeRSVPCallback, this));
        var response_negative = (response == 'yes')? 'no': 'yes';

        var parent = $btn.parent();
        parent.removeClass('confirmed-negative');
        parent.addClass('confirmed-positive');
        parent.parent().find('.btn-' + response_negative).addClass('confirmed-negative');
        parent.parent().find('.btn-' + response_negative).removeClass('confirmed-positive');
    },

    attendeeRSVPCallback: function(data){

    }
});