InviteCreateView = SimpleView.extend({
    el: '#view-container',

    initialize: function(options){
        this.options = options || {};
        this.model = new InviteModel();
    },
    events: {
       'click .send': 'submitNew',
       //'change .share_to_facebook': 'share_on_facebook_auth'
    },
    bindings: {
        '.event-name': 'title',
        '.event-name-input': 'title',
        '.organizer-email-input': 'organizer_email',
        '.event-description': 'description',
        '.event-description-input': 'description',
        '.event-where': 'where',
        '.event-location-input': 'where',

        '.event-start-date': 'start_date',
        '.event-start-time': 'start_time',
        '.event-end-date': 'end_date',
        '.event-end-time': 'end_time'
    },
    template: JST['invite_create.html'],
    contacts: null,

    render: function(options) {
       this.hidePanels();
        if(options.title != null)
            this.model.set('title', options.title);

        if(options.id != null)
            this.createFromInvite(options.id);

        var model_json = this.model.toJSON();
        model_json.anonymous = currentUser == null;

        this.$el.html(this.template(model_json));

        //this.showOrganizerEmailIfAnonymous();
        this.plugins();
        this.stickit();
        return this;
    },

    createFromInvite: function(source_invite_id){
        var that = this;
        $.ajax({
            url: "/api/invite/" + source_invite_id,
            type: "GET",
            cache: false,
            success: function(data) {
                that.model = new InviteModel(data);
                that.model.set('unique_id', '');

                that.render(data);
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

    submitNew:function(e){
        var that = this;
        if(!validator.validateItems('.valid-before-submit') ){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        this.model.createNew($.proxy(this.inviteSubmitted, this), true);
    },

    inviteSubmitted: function(result){
        if(currentUser)
            Backbone.history.navigate('invite/' + result + '/edit', true);
        else {
            window.location.href = 'invite/confirmation/' + result;
            //Backbone.history.navigate('invite/confirmation/' + result, false);
        }
    },

    /*share_on_facebook_auth: function(){
        //var facebook_auth = window.open(api.url + "/social_sharing/facebook");

        if((currentUser != null && currentUser.social_sharing.facebook)
            || !$('#bt_toggle').is(':checked'))
            return;
        window.open(
            api.url + "/social_sharing/facebook",
            "_blank",
            "toolbar=yes, scrollbars=no, resizable=yes, top=500, left=500"
        );
    },*/

    plugins: function(){
        //$('#bt_toggle').bootstrapToggle();

         //DatePicker
        this.$el.find('.event-start-date, .event-end-date').datetimepicker({
            pickTime: false,
            minDate: moment()
        });
        this.$el.find('.event-start-time, .event-end-time').datetimepicker({
            pickDate: false,
        });
        this.initWhere();
    },

    initWhere: function () {
        var that = this;
        if(typeof google === 'undefined')
            return;
        this.$where = this.$el.find('.event-location-input');

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

    showOrganizerEmailIfAnonymous: function(){
        if(currentUser)
            $('.organizer-email-input-row').hide();
    }
});
