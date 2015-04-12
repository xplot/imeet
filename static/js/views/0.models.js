
Contact = Backbone.Model.extend({
    defaults: {
        unique_id: '',
        name: '',
        email: '',
        phone: ''
    },

    includeInInvite: function(invite_id, view, callback){
        var url = "/api/invite/" + invite_id + "/attendees/";
        //this.set('contact_unique_id', this.get('unique_id'));
        var attendees = [this.toJSON()];

        var post = {
            user_id: currentUser.id,
            attendees: attendees
        };

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(post),
            cache: false,
            success: function(data) {
                if(callback)
                    callback(view, data)
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    }
});

ContactList = Backbone.Collection.extend({
    model: Contact,

    getById: function(unique_id){
        return this.filter(function(val) {
            return val.get("unique_id") === unique_id;
        });
    },

    removeBy: function(unique_id){
        this.remove(this.getById(unique_id));
    },

    collectionToJSON : function() {
      return this.map(function(model){
          return model.toJSON2()
      });
    }
 });


Group = Backbone.Model.extend({
    defaults: {
        name: '',
        contacts: new ContactList()
    }
});

GroupList = Backbone.Collection.extend({
    model: Group,
    localStorage: new Store("backbone-group"),

    getById: function(unique_id){
        return this.filter(function(val) {
            return val.get("unique_id") === unique_id;
        });
    },

    removeBy: function(unique_id){
        this.remove(this.getById(unique_id));
    },

    collectionToJSON : function() {
      return this.map(function(model){
          return model.toJSON2()
      });
    }
 });

InviteModel = Backbone.Model.extend({
    defaults: {
        'unique_id': '',
        'title': '',
        'start_date': '',
        'start_time': '',
        'end_date': '',
        'end_time': '',
        'description': '',
        'where': '',
        'poster_image_id': '',
        'attendees': new ContactList(),
        'all_contacts': new ContactList(),
        'all_groups': new ContactList()
    },

    initialize: function (options) {
        if(options == null)
            return;
        var start_datetime = this.parse_datetime(options.start);
        var end_datetime = this.parse_datetime(options.end);

        this.set('start_date', start_datetime.date);
        this.set('start_time', start_datetime.time);
        this.set('end_date', end_datetime.date);
        this.set('end_time', end_datetime.time);

        var attendees = new ContactList();
        options.attendees.forEach(function(item){
            attendees.push(new Contact(item));
        });
        this.set('attendees', attendees);
    },

    format_date: function(property, format){
        var _date = this.get(property);

        if(isNullOrEmpty(_date))
            return null;

        return moment(_date).format(format);
    },

    get_datetime: function(property){
        var time = this.get(property+'_time');
        var date = this.get(property+'_date');

        if(isNullOrEmpty(time)|| isNullOrEmpty(date))
            return null;
        return date + " " + time;
    },

    parse_datetime: function(datetime){
        if(isNullOrEmpty(datetime))
            return {
                date : null,
                time: null
            };

        var moment_obj = moment(datetime);

        return {
            date: moment_obj.format('MM/D/YYYY'),
            time: moment_obj.format('hh:mm A')
        };
    },

    toJSON: function(){
        var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
        json['start'] = this.get_datetime('start');
        json['end'] = this.get_datetime('end');
        return json;
    },

    submit: function(callback, view, enableNotifications){
        var that = this;
        var invite = this.toJSON();
        if(currentUser != null)
            invite.user_id = currentUser.id;
        var url = "/api/invite/";
        if(this.get('unique_id')!==null)
            url += this.get('unique_id');

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(invite),
            cache: false,
            success: function(data) {
                if(enableNotifications)
                    alert_notification([{
                        alertType:'success',
                        message: 'Event saved successfully!'
                    }]);
                callback(view, data)
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

});
