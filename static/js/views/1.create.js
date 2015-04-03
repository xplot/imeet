

CreateContactView = Backbone.View.extend({
    //Will have to do it
});
ReadContactView = Backbone.View.extend({
    //Will have to do it, ugly and quick for now
});

CreateView = SimpleView.extend({
    el: '#view-container',

    initialize: function(options){
        this.options = options || {};
        this.model = new InviteModel();
    },
    events: {
       'click .send': 'submitNew',
       'change .share_to_facebook': 'share_on_facebook_auth',
    },
    bindings: {
        '.event-name': 'title',
        '.event-name-input': 'title',
        '.event-description': 'description',
        '.event-description-input': 'description',
        '.event-where': 'where',
        '.event-where-input': 'where',

        '.event-start-date': 'start_date',
        '.event-start-time': 'start_time',
        '.event-end-date': 'end_date',
        '.event-end-time': 'end_time'
    },
    template: JST['invite.html'],
    contacts: null,

    render: function(options) {
       this.hidePanels();
        if(options.title != null)
            this.model.set('title', options.title);

        if(options.id != null)
            this.createFromInvite(options.id);

        this.$el.html(this.template(this.model.toJSON()));

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
                this.render(data);
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
        var invite = this.model.toJSON();
        if(currentUser != null)
            invite.user_id = currentUser.id;

        $.ajax({
            url: "/api/invite/send",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(invite),
            cache: false,
            success: function(data) {
                alert_notification([{
                    alertType:'success',
                    message: 'Event sent!'
                }]);

//                if(currentUser == null) //If Anonymous we will give people a link to follow the invite
//                    Backbone.history.navigate('sent/' + data[0], true);
//                else
                Backbone.history.navigate('view/' + data, true);
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },


    parsePhoneAndEmail: function(addressString){
        var trimmedAddressString = addressString.trim();
        var addresses = addressString.split(';');
        if(addresses.length == 1)
            addresses = addressString.split(',');

        for(var i=0; i < addresses.length; i++)
            addresses[i] = addresses[i].trim();

        //only 1 address (phone or email)
        if(addresses.length == 1){
            if(isNaN(addresses[0]))
                return {email: addresses[0], phone: ''};
            else
                return {phone: addresses[0], email: ''};
        }
        else{ //phone and email at the same time.
            if(isNaN(addresses[0]))
                return {email: addresses[0], phone: addresses[1]};
            else
                return {phone: addresses[0], email: addresses[1]};
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

    plugins: function(){
        $('#bt_toggle').bootstrapToggle();

         //DatePicker
        this.$el.find('.event-start-date, .event-end-date').datetimepicker({
            pickTime: false,
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
