InviteModel = Backbone.Model.extend({
  defaults: {
        'title': '',
        'start_date': '',
        'start_time': '',
        'end_date': '',
        'end_time': '',
        'description': '',
        'where': '',
        'contacts': new ContactList(),
        'all_contacts': new ContactList(),
        'all_groups': new ContactList(),
    }
});

CreateContactView = Backbone.View.extend({
    //Will have to do it
});
ReadContactView = Backbone.View.extend({
    //Will have to do it, ugly and quick for now
});

CreateView = SimpleView.extend({
    el: '#view-container',
    bindings: {
        '.event-name': 'title',
        '.event-name-input': 'title',
        '.event-start-date': 'start_date',
        '.event-start-time': 'start_time',
        '.event-end-date': 'end_date',
        '.event-end-time': 'end_time',
        '.event-description': 'description',
        '.event-description-input': 'description',
        '.event-where': 'where',
        '.event-where-input': 'where',

        '.event-start-date-formatted': {
            observe: ['start_date', 'start_time'],
            onGet: function (values) {
                //if(Date.parse(values[0] + ' ' + values[1]))
                return 'From: ' + values[0] + ' ' + values[1];
            }
        },
        '.event-end-date-formatted': {
            observe: ['end_date', 'end_time'],
            onGet: function (values) {
                return 'To: ' + values[0] + ' ' + values[1];
            }
        }
    },

    initialize: function(options){
        this.options = options || {};
        this.model = new InviteModel();
    },
    events: {
       'click .new-contact' : 'newContact',
       'click .remove-contact': 'removeContact',
       'keyup .contact-input': 'newContactEnter',
       'click .new-contact-button': 'newContactClick',

       'click .send': 'submitNew',
       'change .share_to_facebook': 'share_on_facebook_auth',
       //'click .share_to_facebook' : 'share_on_facebook_auth'
       'click .contact-input-container': 'focusOnClick'
    },

    template: JST['invite.html'],
    contacts: null,

    render: function(options) {
       this.hidePanels();
        if(options.title != null)
            this.model.set('title', options.title);

        this.i = 0;

        this.listenTo(this.model.get('contacts'), 'add', this.newContact);
        this.listenTo(this.model.get('contacts'), 'remove', this.removeContact_DOM);

        if(options.id != null)
            this.createFromInvite(options.id);
        else{

        }

        this.$el.html(this.template(this.model.toJSON()));
        this.$newContact = this.$el.find('.contact-input');

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
                that.model.set('title', data.title);
                that.model.set('description', data.description);
                that.model.set('where', data.where);
                that.model.set('start_date', moment(data.start).format('L'));
                that.model.set('start_time', moment(data.start).format('LT'));

                if(data.end){
                    that.model.set('end_date', moment(data.end).format('L'));
                    that.model.set('end_time', moment(data.end).format('LT'));
                }

                data.contacts.forEach(function(contact){
                    that.model.attributes.contacts.add(new Contact(contact));
                });

            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },

    last_selected_item: null,
    newContactEnter: function(evt) {
        if (evt.keyCode != 13) {
            return;
        }
        this.$newContact.trigger('blur');
        this.newContactClick();
    },
    newContactClick: function() {
        var contact = null;
        var group = null;
        if(this.last_selected_item != null && this.last_selected_item.is_group)
            group = this.last_selected_item;
        else if(this.last_selected_item != null ){
            contact = this.last_selected_item;
        }

        if(this.last_selected_item == null && this.$newContact.val() != ''){
            if(!validator.validateItem(this.$newContact)){
                alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
                return;
            }

            var emailAndPhone = this.parsePhoneAndEmail(this.$newContact.val());
            contact = {
                unique_id:  guid(),
                name:       '',
                email:      emailAndPhone.email,
                phone:      emailAndPhone.phone
            };
        }

        this.$newContact.val('');
        this.last_selected_item = null;

        if(contact != null)
            this.model.attributes.contacts.add(new Contact(contact));
        if(group != null)
            this.addContactsFromGroup(group.unique_id);
    },

    addContactsFromGroup: function(group_id){
        var that = this;
        $.ajax({
            url: "/api/group/" + group_id + "?user_id="+currentUser.id,
            type: "GET",
            success: function(data) {
                if(data.length == 0){
                    alert_notification([{alertType: 'warning', message: 'No contacts in the selected group!'}]);
                    return;
                }

                data.forEach(function(item){
                    var contact = new Contact(item);
                    that.model.attributes.contacts.add(contact);
                });
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: "There was an error getting the contacts for the group"
                }]);
            }
        });
    },

    //start-AddContact
    newContact: function(contactModel){
        if(this.$table == null)
            this.$table = this.$el.find('.contact-table');
        this.$table.prepend(
            JST['contact-item-invite-create.html'](contactModel.toJSON())
        );

        return false;
    },
    //end-AddContact

    //start-RemoveContact
    removeContact:function(e){
        var dataId = $(e.currentTarget).data('rowid');
        this.model.attributes.contacts.removeBy(dataId);
    },
    removeContact_DOM: function (contact) {
        if(this.$table == null)
            this.$table = this.$el.find('.contact-table');
        this.$table.find('#' + contact.attributes.unique_id).remove();
    },
    //end-RemoveContact

    submitNew:function(e){
        var that = this;
        if(!validator.validateItems('.valid-before-submit') ||
            this.model.attributes.contacts.length == 0){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }
        
        var event = {
            'title': this.model.get('title'),
            'description': this.model.get('description'),
            'where': this.model.get('where'),

            'start': this.model.get('start_date') + " " +  this.model.get('start_time'),
            'end': isNaN(this.model.get('end_date'))?
                    this.model.get('end_date') + " " + this.model.get('end_time')
                    : null,

            'facebook_share': true,
            'user_id': (currentUser!=null)?currentUser.id: null,
            'contacts': this.model.attributes.contacts.collectionToJSON()
        };

        $.ajax({
            url: "/api/invite",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(event),
            cache: false,
            success: function(data) {
                alert_notification([{
                    alertType:'success',
                    message: 'Event sent!'
                }]);

//                if(currentUser == null) //If Anonymous we will give people a link to follow the invite
//                    Backbone.history.navigate('sent/' + data[0], true);
//                else
                Backbone.history.navigate('view/' + data[0], true);
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

    searchContact: function(input){
        return ['pepe','jose'];
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

        this.setupContactsTypeahead();

        this.initWhere();

        try{
            //Snap Panel
            var $last_item = $("a .active");
            this.$el.find('.snap-panel').panelSnap({
                menuSelector: 'a',
                onSnapStart: function($target){
                },
                onSnapFinish: function($target){
                },
                onActivate: function(){},
                directionThreshold: 50,
                slideSpeed: 200,
                $menu: this.$el.find('.menu'),
                keyboardNavigation: {
                    enabled: true,
                    nextPanelKey: 40,
                    previousPanelKey: 38,
                    wrapAround: false
                }
            });
        }
        catch(ex){
            //Swallow ex
        }
    },

    setupContactsTypeahead: function(){
        var that = this;

        var substringMatcher = function(strs) {
            return function findMatches(q, cb) {
                var matches, substrRegex;
                matches = [];
                substrRegex = new RegExp(q, 'i');

                $.each(strs, function(i, contact) {
                    if (substrRegex.test(contact.name) || substrRegex.test(contact.email) || substrRegex.test(contact.phone))
                        matches.push(contact);
                });
            cb(matches);
            };
        };

        var substringGroupMatcher = function(strs) {
            return function findMatches(q, cb) {
                var matches, substrRegex;
                matches = [];
                substrRegex = new RegExp(q, 'i');

                $.each(strs, function(i, group) {
                    if (substrRegex.test(group.name)){
                        group.is_group = true;
                        matches.push(group);
                    }
                });
            cb(matches);
            };
        };

        var setupTypeAhead = function(contacts_and_groups){
            that.$newContact.typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
            },
            {
                autoselect: true,
                name: 'contacts',
                displayKey: 'name',
                source: substringMatcher(contacts_and_groups.contacts),
                templates: {
                    header: '<h5>Contacts</h5>',
                    suggestion: JST['contact_item_typeahead.html']
                }

            },
            {
                autoselect: true,
                name: 'groups',
                displayKey: 'name',
                source: substringGroupMatcher(contacts_and_groups.groups),
                templates: {
                    header: '<h5>Groups</h5>',
                    suggestion: _.template('<%- name %>')
                }

            }
            ).on('typeahead:selected', function (obj, data) {
                that.last_selected_item = data;
            })
            .on('keypress keydown input', function($e) {
                $e.stopPropagation();
            });
        };

        if(currentUser == null){
            setupTypeAhead([]);
            return;
        }

        $.ajax({
            url: "/api/contacts/groups?user_id="+currentUser.id,
            type: "GET",
            success: function(data) {
                that.model.attributes.all_contacts = new ContactList(data);
                setupTypeAhead(data);
            },
            error: function(data) {

            }
        });
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
    }
});
