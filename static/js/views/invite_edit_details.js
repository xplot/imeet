InviteEditDetailsView = SimpleView.extend({
    template: JST['invite_edit.html'],
    bindings: {
        '.event-name': 'title',
        '.event-name-input': 'title',
        '.event-end-date': 'end',
        '.event-end-time': 'end',
        '.event-description': 'description',
        '.event-description-input': 'description',
        '.event-where': 'where',
        '.event-where-input': 'where',

        '.event-start-date': {
            observe: ['start'],
            onGet: function(values) {
                if(values.length == 0 || values[0] == '')
                    return null;
                return moment(values[0]).format('MM/D/YYYY');
            },
            onSet: function(value) {
                return null; //we will do this manually later
            }
        },

        '.event-start-time': {
            observe: ['start'],
            onGet: function(values) {
                if(values.length == 0 || values[0] == '')
                    return null;

                return moment(values[0]).format('hh:mm A');
            },
            onSet: function(value, options) {
                var current_date = moment(options.view.model.get('start'));
                var new_time = moment(value);
                console.log(value);
                current_date.hour(new_time.hour());
                current_date.minutes(new_time.minutes());

                console.log(current_date.format('MM/D/YYYY hh:mm A'));
                return current_date.format('MM/D/YYYY hh:mm A'); //we will do this manually later
            }
        }


    },
    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    events: {
        'click .save-button': 'save',
        'click .edit-button': 'edit'
    },

    render: function(invite_model, edit_view){
        this.model = invite_model;
        var invite_json = this.model.toJSON();
        invite_json['edit_view'] = edit_view;
        this.$el.html(this.template(invite_json));

        if(edit_view){
            this.edit_plugins();
            this.stickit();
        }

    },

    edit: function(){
        this.render(this.model, true);
        this.edit_plugins();
    },

    save: function(){
        if(!validator.validateItems('.valid-before-submit') ||
            this.model.attributes.contacts.length == 0){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        console.log(this.model.get('start_date'));
        console.log(this.model.get('start_time'));

        this.model.set('start', this.model.get('start_date') + " " + this.model.get('start_time'));
        console.log(this.model.get('start'));

        this.model.set('end', this.model.get('end_date') + " " + this.model.get('end_time'));
        this.render(this.model, false)
    },

    submit: function(){
        var that = this;
        $.ajax({
            url: "/api/invite",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(this.model.toJSON()),
            cache: false,
            success: function(data) {

              console.log(data);
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

    edit_plugins: function(){
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
        that.$where = this.$el.find('.event-where-input');

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
