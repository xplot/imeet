SearchView = SimpleView.extend({
    template: JST['invite_search.html'],

    initialize: function(options){
        this.options = options || {};
    },
    events: {
        'click .search' : 'search_value',
        'keypress #searchBox' : 'type_key',
        'click .btn-duplicate' : 'duplicate',

        'click .filter': 'filterClick',

        'click .btn-yes' : 'rsvpYes',
        'click .btn-no' : 'rsvpNo',

        'click .btn-edit' : 'edit',
        'click .btn-cancel' : 'cancel',
        'click .invite-background': 'navigate'
    },

    render: function(invites, search, filter_type) {

        var paletteView = new PaletteView();
        paletteView.clearPalette();

        this.search_term = search;
        this.filter = filter_type;

        this.hidePanels();
        this.model = this.getFilteredList(invites, this.filter);

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

    getFilteredList: function(inviteSource, filter_type){
        if(inviteSource == null)
            return null;

        if(filter_type == null){
            return inviteSource;
        }

        var filters = [];
        if(filter_type == 'all')
            filters = ['yes','no','no_response', 'organizer' ];
        if(filter_type == 'unread')
            filters = ['no_response'];
        if(filter_type == 'accepted')
            filters = ['yes'];
        if(filter_type == 'denied')
            filters = ['no'];
        if(filter_type == 'host')
            filters = ['organizer'];

        var invite_list = new InviteList();

        inviteSource.forEach(function(invite){
            filters.forEach(function(filter){
                if(invite.get('invite_attendee_role') == filter)
                    invite_list.add(invite);
            });
        });

        return invite_list;
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
                that.render(invite_list, value, that.filter);
            }
        });
    },

    filterClick: function(evt){
        evt.preventDefault();
        evt.stopPropagation();

        var $btn = $(evt.target);
        var filter = $btn.data('filter');
        if(filter != '')
            Backbone.history.navigate('search/' + filter, true);
        else
            Backbone.history.navigate('search', true);
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