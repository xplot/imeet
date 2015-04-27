
//Didnt find where to put this
var fetchGroupDistributionForCurrentUser = function(callback){
    if(currentUser == null){
        callback({
            contacts: [],
            groups: []
        });
    }
    else{
        $.ajax({
            url: "/api/contacts/groups?user_id="+currentUser.id,
            type: "GET",
            success: function(data) {
                    if(callback != null)
                        callback(data);
            },
            error: function(data) {

            }
    });
    }

};

IMeetCollection = Backbone.Collection.extend({
    getById: function(unique_id){
        var result = this.filter(function(val) {
            return val.get("unique_id") === unique_id;
        });

        if(result.length > 0)
            return result[0];
        return null;
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
            attendees: attendees
        };

        if(currentUser!=null){
            post.user_id = currentUser.id; 
        }

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
    },

    removeFromInvite: function(invite_id, callback){
        var url = "/api/invite/" + invite_id + "/attendees/" + this.get('unique_id');

        $.ajax({
            url: url,
            type: "DELETE",
            contentType: "application/json",
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
    },

    acknowledgeInvite: function(response, callback){
        var url = "/api/invite/attendees/" + this.get('unique_id') + '/response';
        var post = {
            response: response,
            channel: 'web'
        };

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(post),
            cache: false,
            success: function(data) {
                if(callback != null)
                    callback(data);
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

    someIdentifier: function(){
        var name = this.get('name');
        if(name != null && name !== '')
            return name;
        name = this.get('email');
        if(name != null && name !== '')
            return name;
        name = this.get('phone');
        return name;
    }
});

ContactList = IMeetCollection.extend({
    model: Contact
 });


Group = Backbone.Model.extend({
    defaults: {
        unique_id: '',
        name: '',
        contacts: new ContactList()
    },

    fetchContacts: function(callback){
        $.ajax({
            url: "/api/group/" + this.get('unique_id') + "?user_id="+currentUser.id,
            type: "GET",
            success: function(data) {
                var contactList = new ContactList();
                data.forEach(function(item){
                    contactList.add(new Contact(item));
                });

                callback(contactList)
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: "There was an error getting the contacts for the group"
                }]);
            }
        });
    },

    includeInInvite: function(invite_id, callback){
        var url = "/api/invite/" + invite_id + "/group/";

        var post = {
            user_id: currentUser.id,
            unique_id: this.get('unique_id')
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

GroupList = IMeetCollection.extend({
    model: Group,
    localStorage: new Store("backbone-group"),
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
            if(options.attendees != null)
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

    fetch: function(callback){
        var that = this;
        $.ajax({
            url: "/api/invite/" + this.get('unique_id'),
            type: "GET",
            cache: false,
            success: function(data) {
                callback(that.get('unique_id'), data);
            }
        });
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

    notifyAll: function(callback){
        var invite = this.toJSON();

        $.ajax({
            url: "/api/invite/" + this.get('unique_id') + "/attendees/notify/all",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(invite),
            cache: false,
            success: function(data) {
                callback(data)
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

InviteList = IMeetCollection.extend({
    model: InviteModel
 });


CommentModel = Backbone.Model.extend({
    defaults: {
        on: null,
        comment: '',
        author: ''
    },

    initialize: function (options) {
        if(typeof options == 'string')
            this.set('comment', options)
    },

    submit: function(invite_id, invite_attendee_id){

        var url = "/api/invite/{0}/comment".format(invite_id);
        if(invite_attendee_id != null)
            url = "/api/invite/{0}/attendees/{1}/comment".format(
                invite_id,
                invite_attendee_id
            );

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                comment: this.get('comment')
            }),
            cache: false,
            success: function(data){

            },
            error: function(data) {
                if(data.status != 200)
                    alert_notification([{
                        alertType:'danger',
                        message: data.responseText
                    }]);
            }
        });
    }
});

CommentList = IMeetCollection.extend({
    model: CommentModel,

    fetchFromInvite: function(invite_unique_id){
        $.ajax({
            url: "/api/invite/{0}/comment".format(invite_unique_id),
            type: "GET",
            contentType: "application/json",
            cache: false,
            success: function(data) {
                var comments = new CommentList();
                data.forEach(function(comment){
                    comments.add(new CommentModel(comment));
                });
                return comments;
            },
            error: function(data) {

            }
        });
    }
});