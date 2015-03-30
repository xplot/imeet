AdminInviteView = SimpleView.extend({
    template: JST['inviteReport.html'],
    inviteId:null,
    author: "Organizer",
    contacts: null,

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    events: {
        "keypress .invite-newComment": "addNewComment",
        'change .share_to_facebook': 'share_on_facebook_auth',
    },

    render: function(data){
        this.hidePanels();
        this.model = new InviteModel(data);

        this.inviteId = data.invite_id;

        if(this.inviteId == null)
            console.error('Invite Id is null, check routing');

        var invite_json = this.model.toJSON();

        this.$invite_header = $('#invite-header');
        this.$invite_edit = $('#invite-edit');
        this.$invite_contacts = $('#invite-attendees');

        this.$invite_header.html(JST['invite_header.html'](invite_json) );
        this.$invite_edit.html(JST['invite_edit.html'](invite_json) );
        var invite_attendees = new InviteAttendeesView();
        this.$invite_contacts.html(invite_attendees.render({
            contacts: data.contacts
        }));

        this.plugins();
    },

    share_on_facebook_auth: function(){
        //var facebook_auth = window.open(api.url + "/social_sharing/facebook");

        if((currentUser != null && currentUser.social_sharing.facebook)
            || !$('#bt_toggle').is(':checked'))
            return;
        window.open(
            api.url + "/social_sharing/facebook",
            "_blank",
            "toolbar=yes, scrollbars=no, resizable=yes, top=500, left=500"
        );
    },

    plugins: function(){
        $('#bt_toggle').bootstrapToggle();

//         //DatePicker
//        this.$el.find('.event-start-date, .event-end-date').datetimepicker({
//            pickTime: false,
//        });
//        this.$el.find('.event-start-time, .event-end-time').datetimepicker({
//            pickDate: false,
//        });
//
//        this.initWhere();
    },

    initWhere: function () {
        var that = this;
        if(typeof google === 'undefined')
            return;
        this.$where = this.$el.find('.event-where-input');

        autocomplete = new google.maps.places.Autocomplete(
            /** @type {HTMLInputElement} */(that.$where[0]),
            { types: ['geocode'] }
        );

        var fillAddress = function() {
            var place = autocomplete.getPlace();
            that.model.set('where',place.formatted_address);
        };

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            fillAddress();
        });
    },

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    geoLocateWhere: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = new google.maps.LatLng(
              position.coords.latitude, position.coords.longitude);
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    },
});
