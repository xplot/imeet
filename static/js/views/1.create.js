InviteModel = Backbone.Model.extend({
  defaults: {
        'title': '',
        'start_date': '',
        'start_time': '',
        'end_date': '',
        'end_time': '',
        'description': '',
        'address.street': '',
        'address.suite': '',
        'address.city': '',
        'address.state': '',
        'address.zip': '',
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

CreateView = SimpleView.extend({
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
       this.hidePanels();

        this.bindings = inviteBindings;
        this.$el.html(this.template());

        this.$table = this.$el.find('.contact-table');
        this.$btSend = this.$el.find('.send');
        this.$new_name = this.$el.find('.new-contact-name');
        this.$new_phone = this.$el.find('.new-contact-phone');

        this.$btSend = this.$el.find('.send');
        this.i = 0;

        if(options.id != null)
            this.createFromInvite(options.id);
        else{
            this.model = new InviteModel({
                title: options.title
            });
            this.reportView = new ReportView({model:this.model, el: '#reportXXX'});
            this.reportView.render();
            this.stickit();
        }

        this.plugins();

        return this;
    },

    createFromInvite: function(source_invite_id){
        var that = this;
        $.ajax({
            url: "/api/invite/" + source_invite_id,
            type: "GET",
            cache: false,
            success: function(data) {

                that.model = new InviteModel({
                    title: data.title,
                    description: data.description,
                    start_date: moment(data.start).format('L'),
                    start_time: moment(data.start).format('LT'),
                    contacts:[]
                });

                if(data.end){
                    that.model.attributes.end_date = moment(data.end).format('L');
                    that.model.attributes.end_time = moment(data.end).format('LT');
                }

                that.reportView = new ReportView({model:that.model, el: '#reportXXX'});
                that.reportView.render();

                data.contacts.forEach(function(contact){
                    contact.index = that.i;
                    contact.address = [contact.phone, contact.email].join(',');
                    that.$table.append(that.new_contact_string.format(
                        contact.name,
                        contact.address,
                        contact.index));

                    that.model.attributes.contacts.push(contact);
                    that.reportView.addContact(contact);
                    this.i++;
                });

                if(data.where){
                    that.model.attributes['address.street'] = data.where.address;
                    that.model.attributes['address.suite'] = data.where.suite;
                    that.model.attributes['address.city'] = data.where.city;
                    that.model.attributes['address.state'] = data.where.state;
                    that.model.attributes['address.zip'] = data.where.zip;
                }

                that.stickit();
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

        this.$new_name.val('');
        this.$new_phone.val('');

        this.$table.append(this.new_contact_string.format(contact.name,contact.address,contact.index));
        this.reportView.addContact(contact);
        this.model.attributes.contacts.push(contact);

        this.i++;
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

        var event = {
            'title': this.model.attributes.title,
            'description': this.model.attributes.description,
            'start': this.model.attributes.start_date + " " +  this.model.attributes.start_time,
            'end': isNaN(this.model.attributes.end_date)?
                    this.model.attributes.end_date + " " + this.model.attributes.end_time
                    : null,
            'where': {
                'address': this.model.attributes['address.street'],
                'suite': this.model.attributes['address.suite'],
                'city': this.model.attributes['address.city'],
                'state': this.model.attributes['address.state'],
                'zip': this.model.attributes['address.zip']
            },
            'user_id': (currentUser!=null)?currentUser.id: null,
            'contacts': this.normalizeContacts(this.model.attributes.contacts)
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

                if(currentUser == null) //If Anonymous we will give people a link to follow the invite
                    Backbone.history.navigate('sent/' + data[0], true);
                else
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
    },

    plugins: function(){
        //DatePicker
        this.$el.find('.event-start-date, .event-end-date').datepicker({});
        this.$el.find('.event-start-time, .event-end-time').timepicker({
            minuteStep: 5,
            template: false,
            appendWidgetTo: 'body',
            showSeconds: false,
            showMeridian: true,
            defaultTime: false
        });

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
}
});
