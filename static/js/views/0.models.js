
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
        invite_attendee_id: '',
        name: '',
        email: '',
        phone: ''
    },

    includeInInvite: function(invite_id, callback){
        var that = this;
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
                that.set('invite_attendee_id', data[0]);

                if(callback)
                    callback(that)
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
        var url = "/api/invite/" + invite_id + "/attendees/" + this.get('invite_attendee_id');

        $.ajax({
            url: url,
            type: "DELETE",
            contentType: "application/json",
            cache: false,
            success: function(data) {
                if(callback != null)
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

    acknowledgeInvite: function(response, callback){
        var url = "/api/invite/attendees/" + this.get('invite_attendee_id') + '/response';
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

    create: function(callback){
        var that = this;
        var post = {
            contact: this.toJSON()
        };

        if(currentUser!=null) {
            post.user_id = currentUser.id;
        }

        $.ajax({
            url: "/api/contacts",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(post),
            cache: false,
            success: function(unique_id) {
                that.set('unique_id', unique_id);
                if(callback != null)
                    callback(unique_id);
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

    update: function(callback){
        var unique_id = this.get('unique_id');
        if(unique_id == null || unique_id == '')
            return this.create(callback);

        var post = {
            contact: {
                name: this.get('name'),
                email: this.get('email'),
                phone: this.get('phone')
            }
        };

        if(currentUser!=null) {
            post.user_id = currentUser.id;
        }

        $.ajax({
            url: "/api/contacts/" +  unique_id + "/edit",
            data:JSON.stringify(post),
            type: "PUT",
            contentType: "application/json",
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

    updateAttendee: function(invite_id, callback){
        var url = "/api/invite/" + invite_id + "/attendee/";

        var post = {
            invite_attendee_id: this.get('invite_attendee_id'),

            contact: {
                unique_id: this.get('unique_id'),
                name: this.get('name'),
                email: this.get('email'),
                phone: this.get('phone')
            }
        };

        if(currentUser!=null){
            post.user_id = currentUser.id;
        }

        $.ajax({
            url: url,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(post),
            cache: false,
            success: function(data) {
                if(callback)
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

    deleteContact: function(callback){

        var unique_id = this.get('unique_id');

        $.ajax({
            url: "/api/contacts/" + currentUser.id + "/delete/" + unique_id,
            type: "DELETE",
            contentType: "application/json",
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
    },

    addToGroup: function(group_unique_id, callback){
        $.ajax({
            url: "/api/group/" + group_unique_id+ "/"+ this.get('unique_id') + "?user_id=" + currentUser.id,
            type: "POST",
            contentType: "application/json",
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
        var post = {
            contact: this.toJSON()
        };

        if (currentUser != null) {
            post.user_id = currentUser.id;
        }

        $.ajax({
            url: "/api/group/" + this.get('name'),
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(post),
            cache: false,
            success: function (unique_id) {
                that.set('unique_id', unique_id);
                if (callback != null)
                    callback(unique_id);
            },
            error: function (data) {
                alert_notification([
                    {
                        alertType: 'danger',
                        message: data.responseText
                    }
                ]);
            }
        });
    },

    update: function(callback){
        var unique_id = this.get('unique_id');
        if(unique_id == null || unique_id == '')
            return this.create(callback);

        var post = {
            group: {
                name: this.get('name'),
            }
        };

        if(currentUser!=null) {
            post.user_id = currentUser.id;
        }

        $.ajax({
            url: "/api/group/" +  unique_id + "/edit",
            data:JSON.stringify(post),
            type: "PUT",
            contentType: "application/json",
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

    fetchContacts: function(callback){
        var that = this;

        $.ajax({
            url: "/api/group/" + this.get('unique_id') + "?user_id="+currentUser.id,
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
        var that = this;
        var url = "/api/invite/" + invite_id + "/group/";

        var post = {
            unique_id: this.get('unique_id')
        };

        if(currentUser!=null) {
            post.user_id = currentUser.id;
        }

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(post),
            cache: false,
            success: function(data) {
                var index = 0;
                var contactsInGroup = that.get('contacts');

                data.forEach(function(item){
                    contactsInGroup.models[index].set('invite_attendee_id', item);
                });

                if(callback != null)
                    callback(that.get('contacts'))
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

    fetchAllGroups: function(callback){
        var that = this;
        var post = {

        };

        if(currentUser == null) {
            return;
        }

        $.ajax({
            url: "/api/group?user_id=" + currentUser.id,
            type: "GET",
            contentType: "application/json",
            data: JSON.stringify(post),
            cache: false,
            success: function(groups) {
                if(callback != null)
                    callback(groups);
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

        var headers = {};
        if(currentUser != null){
            headers['session_token'] = currentUser.session_token;
        }
        $.ajax({
            headers: headers,
            url: "/api/invite/" + this.get('unique_id'),
            type: "GET",
            cache: false,
            success: function(data) {
                callback(that.get('unique_id'), data);
            }
        });
    },

    updateTitle: function(callback , enableNotifications){
        var that = this;

        var url = "/api/invite/" +  this.get('unique_id') + "/title";

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                title: this.get('title')
            }),
            cache: false,
            success: function(data) {
                if(enableNotifications)
                    alert_notification([{
                        alertType:'success',
                        message: 'Event saved successfully!'
                    }], 3000);
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

    updateDescription: function(callback , enableNotifications){
        var that = this;

        var url = "/api/invite/" +  this.get('unique_id') + "/description";

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                description: this.get('description')
            }),
            cache: false,
            success: function(data) {
                if(enableNotifications)
                    alert_notification([{
                        alertType:'success',
                        message: 'Event saved successfully!'
                    }], 3000);
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

    createNew: function(callback, enableNotifications){
        var url = "/api/invite/";
        this.x_submit(url, callback, enableNotifications);
    },

    update: function(callback, enableNotifications){
        var url = "/api/invite/" + this.get('unique_id');
        this.x_submit(url, callback, enableNotifications);
    },

    x_submit: function(url, callback, enableNotifications){
        var that = this;
        var d = new Date();
        this.set('utc_offset', d.getTimezoneOffset());

        var invite = this.toJSON();
        var headers = {};
        if(currentUser != null){
            headers['session_token'] = currentUser.session_token;
        }

        $.ajax({
            headers: headers,
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
                    }], 3000);
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

    tryToObtainAttendeeFromLoggedUser: function(callback){
        var that = this;
        var post = {

        };

        if(currentUser == null) {
            return;
        }

        $.ajax({
            url: "/api/invite/" + this.get('unique_id') + "/attendee/from/?user_id=" + currentUser.id,
            type: "GET",
            contentType: "application/json",
            data: JSON.stringify(post),
            cache: false,
            success: function(attendee) {
                console.log(attendee);

                if(callback != null)
                    callback(attendee);
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
        $.ajax({
            url: "/api/palette/",
            type: "GET",
            contentType: "application/json",
            cache: false,
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