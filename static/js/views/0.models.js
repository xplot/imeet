
var httpRequest = function(ajax_request){
    //Organize here generic request stuff like Auth

    ajax_request.headers = ajax_request.headers || {};

    if(currentUser != null)
        ajax_request.headers['session_token'] = currentUser.session_token;
    if(typeof(invite_attendee) != "undefined" && invite_attendee != null)
        ajax_request.headers['invite_attendee_id'] = invite_attendee.invite_attendee_id;

    if(ajax_request.type != 'GET')
        ajax_request.contentType = 'application/json';

    ajax_request.cache = false;

    if(ajax_request.error == null){
        ajax_request.error = function(data) {
            alert_notification([{
                alertType: 'danger',
                message: data.responseText
            }]);
        }
    }

    $.ajax(ajax_request);
};


//Didnt find where to put this
var fetchGroupDistributionForCurrentUser = function(callback){
    if(currentUser == null)
        callback({
            contacts: [],
            groups: []
        });
    else
        httpRequest({
            url: "/api/contacts/groups",
            type: "GET",
            success: function(data) {
                if(callback != null)
                    callback(data);
            }
        });

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
        invite_attendee_id: '',
        name: '',
        email: '',
        phone: ''
    },

    includeInInvite: function(invite_id, callback){
        var that = this;
        httpRequest({
            url: "/api/invite/" + invite_id + "/attendees/",
            type: "POST",
            data: JSON.stringify({
                attendees: [this.toJSON()]
            }),
            success: function(data) {
                that.set('invite_attendee_id', data[0]);
                if(callback)
                    callback(that)
            }
        });
    },

    removeFromInvite: function(invite_id, callback){
        httpRequest({
            url: "/api/invite/" + invite_id + "/attendees/" + this.get('invite_attendee_id'),
            type: "DELETE",
            success: function(data) {
                if(callback != null)
                    callback(data)
            }
        });
    },

    acknowledgeInvite: function(response, callback){
        httpRequest({
            url: "/api/invite/attendees/" + this.get('invite_attendee_id') + '/response',
            type: "POST",
            data: JSON.stringify({
                response: response,
                channel: 'web'
            }),
            success: function(data) {
                if(callback != null)
                    callback(data);
            }
        });
    },

    create: function(callback){
        var that = this;
        httpRequest({
            url: "/api/contacts",
            type: "POST",
            data: JSON.stringify({
                contact: this.toJSON()
            }),
            success: function(unique_id) {
                that.set('unique_id', unique_id);
                if(callback != null)
                    callback(unique_id);
            }
        });
    },

    update: function(callback){
        var unique_id = this.get('unique_id');
        if(unique_id == null || unique_id == '')
            return this.create(callback);

        httpRequest({
            url: "/api/contacts/" +  unique_id + "/edit",
            data:JSON.stringify({
                contact: {
                    name: this.get('name'),
                    email: this.get('email'),
                    phone: this.get('phone')
                }
            }),
            type: "PUT",
            success: function(data) {
                if(callback != null)
                    callback(data);
            }
        });
    },

    updateAttendee: function(invite_id, callback){
        httpRequest({
            url: "/api/invite/" + invite_id + "/attendee/",
            type: "PUT",
            data: JSON.stringify({
                invite_attendee_id: this.get('invite_attendee_id'),

                contact: {
                    unique_id: this.get('unique_id'),
                    name: this.get('name'),
                    email: this.get('email'),
                    phone: this.get('phone')
                }
            }),
            success: function(data) {
                if(callback)
                    callback(data)
            },
        });
    },

    deleteContact: function(callback){
        httpRequest({
            url: "/api/contacts/delete/" + this.get('unique_id'),
            type: "DELETE",
            success: function(data) {
            if(callback != null)
                callback(data);
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
    },

    addToGroup: function(group_unique_id, callback){
        httpRequest({
            url: "/api/group/" + group_unique_id+ "/"+ this.get('unique_id') ,
            type: "POST",
            success: function(data) {
                if(callback != null)
                    callback(data);
            }
        });
    },
});

ContactList = IMeetCollection.extend({
    model: Contact,

    getByAttendeeId: function(unique_id){
        var result = this.filter(function(val) {
            return val.get("invite_attendee_id") === unique_id;
        });

        if(result.length > 0)
            return result[0];
        return null;
    }
 });


Group = Backbone.Model.extend({
    defaults: {
        unique_id: '',
        name: '',
        contacts: new ContactList()
    },

    create: function(callback) {
        var that = this;
        httpRequest({
            url: "/api/group/" + this.get('name'),
            type: "POST",
            data: JSON.stringify({
                contact: this.toJSON()
            }),
            success: function (unique_id) {
                that.set('unique_id', unique_id);
                if (callback != null)
                    callback(unique_id);
            }
        });
    },

    update: function(callback){
        var unique_id = this.get('unique_id');
        if(unique_id == null || unique_id == '')
            return this.create(callback);

        httpRequest({
            url: "/api/group/" +  unique_id + "/edit",
            data:JSON.stringify({
                group: {
                    name: this.get('name'),
                }
            }),
            type: "PUT",
            success: function(data) {
                if(callback != null)
                    callback(data);
            }
        });
    },

    fetchContacts: function(callback){
        var that = this;

        httpRequest({
            url: "/api/group/" + this.get('unique_id'),
            type: "GET",
            success: function(data) {
                var contactList = new ContactList();
                if(data != null)
                    data.forEach(function(item){
                        contactList.add(new Contact(item));
                    });

                that.set('contacts', contactList);

                if(callback != null)
                    callback(contactList)
            }
        });
    },

    includeInInvite: function(invite_id, callback){
        var that = this;
        httpRequest({
            url: "/api/invite/" + invite_id + "/group/",
            type: "POST",
            data: JSON.stringify({
                unique_id: this.get('unique_id')
            }),
            success: function(data) {
                var index = 0;
                var contactsInGroup = that.get('contacts');

                data.forEach(function(item){
                    contactsInGroup.models[index].set('invite_attendee_id', item);
                });

                if(callback != null)
                    callback(that.get('contacts'))
            }
        });
    },

    fetchAllGroups: function(callback){
        httpRequest({
            url: "/api/group",
            type: "GET",
            data: JSON.stringify(post),
            success: function(groups) {
                if(callback != null)
                    callback(groups);
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
        'all_groups': new ContactList(),
        'utc_offset': 0,

        'palette': null,
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
        console.log('over here');
        httpRequest({
            url: "/api/invite/" + this.get('unique_id'),
            type: "GET",
            success: function(data) {
                callback(that.get('unique_id'), data);
            }
        });
    },

    updateTitle: function(callback , enableNotifications){
        var that = this;
        httpRequest({
            url: "/api/invite/" +  this.get('unique_id') + "/title",
            type: "POST",
            data: JSON.stringify({
                title: this.get('title')
            }),
            success: function(data) {
                if(enableNotifications)
                    alert_notification([{
                        alertType:'success',
                        message: 'Event saved successfully!'
                    }], 3000);
                callback(data)
            }
        });
    },

    updateDescription: function(callback , enableNotifications){
        var that = this;
        httpRequest({
            url: "/api/invite/" +  this.get('unique_id') + "/description",
            type: "POST",
            data: JSON.stringify({
                description: this.get('description')
            }),
            success: function(data) {
                if(enableNotifications)
                    alert_notification([{
                        alertType:'success',
                        message: 'Event saved successfully!'
                    }], 3000);
                callback(data)
            }
        });
    },

    createNew: function(callback, enableNotifications){
        var url = "/api/invite/";
        this._submit(url, callback, enableNotifications);
    },

    update: function(callback, enableNotifications){
        var url = "/api/invite/" + this.get('unique_id');
        this._submit(url, callback, enableNotifications);
    },

    _submit: function(url, callback, enableNotifications){
        var that = this;
        var d = new Date();
        this.set('utc_offset', d.getTimezoneOffset());

        httpRequest({
            url: url,
            type: "POST",
            data: JSON.stringify(this.toJSON()),
            success: function(data) {
                if(enableNotifications)
                    alert_notification([{
                        alertType:'success',
                        message: 'Event saved successfully!'
                    }], 3000);
                callback(data)
            }
        });
    },

    notifyAll: function(callback){
        httpRequest({
            url: "/api/invite/" + this.get('unique_id') + "/attendees/notify/all",
            type: "POST",
            data: JSON.stringify(this.toJSON()),
            success: function(data) {
                callback(data)
            }
        });
    },

    tryToObtainAttendeeFromLoggedUser: function(callback){
        var that = this;

        if(currentUser == null) {
            callback(null);
            return;
        }

        httpRequest({
            url: "/api/invite/" + this.get('unique_id') + "/attendee/from/",
            type: "GET",
            success: function(attendee) {
                if(callback != null)
                    callback(attendee);
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

        httpRequest({
            url: url,
            type: "POST",
            data: JSON.stringify({
                comment: this.get('comment')
            }),
            success: function(data){

            }
        });
    }
});

CommentList = IMeetCollection.extend({
    model: CommentModel,

    fetchFromInvite: function(invite_unique_id){
        httpRequest({
            url: "/api/invite/{0}/comment".format(invite_unique_id),
            type: "GET",
            success: function(data) {
                var comments = new CommentList();
                data.forEach(function(comment){
                    comments.add(new CommentModel(comment));
                });
                return comments;
            }
        });
    }
});

PaletteModel = Backbone.Model.extend({
    defaults: {
        unique_id: null,
        name: null,
        main_color: '',
        main_bg_color: ''
    },

    initialize: function (options) {

    }
});

PaletteList = IMeetCollection.extend({
    model: PaletteModel,

    fetchAll: function(callback){
        httpRequest({
            url: "/api/palette/",
            type: "GET",
            success: function(data) {
                var paletteCollection = new PaletteList();
                data.forEach(function(palette){
                    paletteCollection.add(new PaletteModel(palette));
                });
                if(callback != null)
                    callback(paletteCollection);
            },
            error: function(data) {

            }
        });
    }
});