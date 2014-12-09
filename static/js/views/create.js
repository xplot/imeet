InviteModel = Backbone.Model.extend({
  defaults: {
        'title': '',
        'start_date': '',
        'start_time': '',
        'end_date': '',
        'end_time': '',
        'description': '',
        'address': {
            'street': '',
            'suite':'',
            'city': '',
            'state': '',
            'zip': ''
        },
        'contacts': [],
    }
});

var inviteBindings = {
    '.event-name': 'title',
    '.event-start-date': 'start_date',
    '.event-start-time': 'start_time',
    '.event-end-date': 'end_date',
    '.event-end-time': 'end_time',
    '.event-description': 'description',
    '.event-address-street': 'address.street',
    '.event-address-suite': 'address.suite',
    '.event-address-city': 'address.city',
    '.event-address-zip': 'address.zip',
    '.event-address-state': {
        observe: 'address.state',
        selectOptions: {
            collection: function() {
                return [
                    {value: null, label: ""},
                    {value: "FL", label: "Florida"},
                    {value: "NY", label: "New York"},
                    {value: "CA", label: "California"},
                ]
            }
        }
    },
    '.event-start-date-formatted': {
        observe: ['start_date','start_time'],
        onGet: function (values) {
            //if(Date.parse(values[0] + ' ' + values[1]))
            return 'From: ' + values[0] + ' ' + values[1];
        }
    },
    '.event-end-date-formatted': {
        observe: ['end_date','end_time'],
        onGet: function (values) {
            return 'To: ' + values[0] + ' ' +  values[1];
        }
    },
    '.event-address-state-city': {
        observe: ['address.state','address.city'],
        onGet: function (values) {
            var state = values[0] || '';
            var city = values[1] || '';
            if(state == null && city == null)
                return '';
            return city + ' ' + state;
        }
    },
    '.event-address-street-with-number': {
        observe: ['address.street', 'address.suite'],
        onGet: function (values) {
            var street = values[0] || '';
            var suite = values[1] || '';
            return street + ' ' + suite;
        }
    }
};



CreateContactView = Backbone.View.extend({
    //Will have to do it
});
ReadContactView = Backbone.View.extend({
    //Will have to do it, ugly and quick for now
});

CreateView = Backbone.View.extend({

    el: '#header-container',
    new_contact_string: "\
            <div id='contact_{2}'  class='contact-row equidistant' data-contact='{0};{1};{2}'>\
                <div class='col-md-4 col-md-offset-2'> {0}</div>\
                <div class='col-md-3'> {1}</div>\
                <div class='col-md-1'> \
                    <button type='button' class='btn btn-danger remove-contact form-control' data-row='{2}'>-</button>              \
                </div> \
            </div>",
    reportView: null,
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .new-contact' : 'newContact',
       'click .remove-contact': 'removeContact',
       'click .send': 'submitNew'
    },

    template: JST['invite.html'],

    render: function(options) {
        this.bindings = inviteBindings;

        $('#body-container').hide();
        $('#view-container').show();
        $('#modal_container').modal('hide');

        this.$el.html(this.template());

        this.$table = this.$el.find('.contact-table');
        this.$table = this.$el.find('.contact-table');
        this.$btSend = this.$el.find('.send');
        this.$new_name = this.$el.find('.new-contact-name');
        this.$new_phone = this.$el.find('.new-contact-phone');

        this.$event_name = this.$el.find('.event-name');
        this.$event_start_date = this.$el.find('.event-start-date');
        this.$event_start_time = this.$el.find('.event-start-time');
        this.$event_end_date = this.$el.find('.event-end-date');
        this.$event_end_time = this.$el.find('.event-end-time');

        this.$btSend = this.$el.find('.send');
        this.i = 0;

        //DatePicker
        this.$event_start_date.datepicker({});
        this.$event_start_time.timepicker({
                minuteStep: 5,
                template: false,
                appendWidgetTo: 'body',
                showSeconds: false,
                showMeridian: true,
                defaultTime: false
        });
        this.$event_end_date.datepicker({});
        this.$event_end_time.timepicker({
                minuteStep: 1,
                template: false,
                appendWidgetTo: 'body',
                showSeconds: false,
                showMeridian: true,
                defaultTime: false
        });

        //Snap Panel
        var $last_item = $("a .active");
        this.$el.panelSnap({
            menuSelector: 'a',
//            panelSelector: 'section',
//            namespace: '.panelSnap',
            onSnapStart: function($target){

            },
            onSnapFinish: function($target){
                var menuItem = $target.data('panel');
                $last_item.removeClass('active');
                $last_item = $("a[data-panel='"+ menuItem + "']");
                $last_item.addClass('active');
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

        if(options.id != null)
            this.createFromInvite(options.id);
        else
            this.model = new InviteModel({
                title: options.title
            });

        this.reportView = new ReportView({model:this.model, el: '#reportXXX'});
        this.reportView.render();

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
                data.contacts.forEach(function(contact){
                    that.$table.prepend(
                        that.new_contact_string.format(
                            contact.name || '',
                            contact.phone || '',
                            contact.email || '',
                            this.i
                        )
                    );
                    this.i++;
                });

                that.$btSend.removeAttr('disabled');
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },
    newContact: function(){
        if(!validator.validateItem(this.$new_phone)){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        var contact = {
            name:this.$new_name.val(),
            address: this.$new_phone.val(),
            index:this.i
        };

        this.$table.append(this.new_contact_string.format(contact.name,contact.address,contact.index));
        this.reportView.addContact(contact);
        this.model.attributes.contacts.push(contact);

        this.i++;
        this.$new_name.val('');
        this.$new_phone.val('');

        return false;
    },
    removeContact: function (e) {
        var dataId = "#contact_"+ $(e.currentTarget).data('row');
        this.$table.find(dataId).remove();

        this.reportView.removeContact(dataId);

        //disabling send button
        var $rows = this.$el.find('.contact-row');

        this.removeContactByIndex(parseInt(dataId.split('_')[1]));
    },

    removeContactByIndex: function(index){
        var i = 0;
        this.model.attributes.contacts.forEach(function(contact){
            if(contact.index == index)
                return i;
            i++;
        });

        this.model.attributes.contacts.splice(i, 1);
    },

    submitNew:function(e){
        var that = this;

        if(!validator.validateItems('.valid-before-submit') ||
            this.model.attributes.contacts.length == 0){
            alert_notification([{alertType: 'warning', message: 'You have incorrect or missing fields!'}]);
            return;
        }

        var $rows = this.$el.find('.contact-row');
        var event = {
            'title': this.model.attributes.title,
            'description': this.model.description,
            'start': this.model.attributes.start_date + " " +  this.model.attributes.start_time,
            'end': isNaN(this.model.attributes.end_date)?
                    this.model.attributes.end_date + " " + this.model.attributes.end_time
                    : null,
            'user_id': (currentUser!=null)?currentUser.id: null,
            'contacts': this.normalizeContacts(this.model.attributes.contacts)
        };
        console.log(this.model);
        console.log(event);

        $.ajax({
            url: "/api/invite",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(event),
            cache: false,
            success: function() {
                alert_notification([{
                    alertType:'success',
                    message: 'Event sent!'
                }]);
                Backbone.history.navigate('', true);
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
    },
    normalizeContacts: function(contacts){
        var result = [];
        var that = this;
        contacts.forEach(function(contact){
            var addresses = that.parsePhoneAndEmail(contact.address);
            result.push({
                    name: contact.name,
                    email: addresses.email,
                    phone: addresses.phone
            });
        });

        return result;
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
    }
});
