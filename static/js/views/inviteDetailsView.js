InviteDetailsView = SimpleView.extend({
    template: JST['invite_details.html'],
    el:'#invite-details',
    bindings: {
        '.event-name': 'title',
        '.event-name-input': 'title',
        '.event-description': 'description',
        '.event-description-input': 'description',
        '.event-where': 'where',
        '.event-location-input': 'where',

        '.event-start-date': 'start_date',
        '.event-start-time': 'start_time',
        '.event-end-date': 'end_date',
        '.event-end-time': 'end_time'
    },


    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    events: function(){
        if(this.options.is_admin)
            return {
                'click .invite-date': 'edit_invite',
                'click .invite-end-date': 'edit_invite',
                'click #invite-location': 'edit_invite',
                'click .invite-palette .palette-item': 'edit_invite',

                //'click .edit_invite': 'editInvite',
                'click .save_invite': 'save_invite',
                //'click .event-location-input': 'edit_invite',
                //'blur #detail_container': 'save_invite',
                //'focusout #detail_container': 'save_invite',

                /*'blur .event-start-date': 'save_invite',
                 'blur .event-start-time': 'save_invite',
                 'blur .event-end-date': 'save_invite',
                 'blur .event-end-time': 'save_invite',
                 'blur .event-location-input': 'save_invite'*/
            };

    },

    render: function(invite_model, edit_view){
        this.edit_view = edit_view;

        this.model = invite_model;
        var invite_json = this.model.toJSON();
        invite_json['is_admin'] = this.options.is_admin;
        invite_json['is_edit'] = edit_view;

        this.$el.html(this.template(invite_json));

        if(edit_view){
            this.showPalette();
            this.edit_plugins();
            this.stickit();
        }
        else{
            this.read_plugins();
        }

    },

    edit_invite: function(){
        this.render(this.model, true);
    },

    save_invite: function(){
        if(!validator.validateItems('.valid-before-submit')){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        if( ($('.event-end-date').val() != '' || $('.event-end-time').val() != '') &&
                !validator.validateItems('.event-end-date, .event-end-time')) {
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        this.model.update($.proxy(this.submitSuccess, this));
    },

    submitSuccess: function(result){
        this.render(this.model, false);
    },

    read_plugins: function(){
        //$('#bt_toggle').bootstrapToggle();
    },

    edit_plugins: function(){
        this.$el.find('.event-start-date, .event-end-date').datetimepicker({
            pickTime: false,
        });
        this.$el.find('.event-start-time, .event-end-time').datetimepicker({
            pickDate: false,
        });

        this.initWhere();

        //$('#bt_toggle').bootstrapToggle();
    },

    initWhere: function () {
        var that = this;

        if(typeof google === 'undefined')
            return;
        that.$where = this.$el.find('.event-location-input');

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

    showPalette: function(show){
        if(!this.edit_view)
            return;

        var palette = new PaletteView();
        palette.render(this.model);
    },
});
