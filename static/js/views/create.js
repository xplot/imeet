CreateContactView = Backbone.View.extend({
    //Will have to do it
});
ReadContactView = Backbone.View.extend({
    //Will have to do it, ugly and quick for now
});

CreateView = Backbone.View.extend({

    el: '#header-container',
    new_contact_string: "\
            <div id='contact{2}'  class='row contact-row equidistant' data-contact='{0};{1};{2}'>\
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
       'click .new-contact' : 'newContact_button',
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
        this.$contactForm = this.$el.find('#newContactForm');
        this.$inviteForm = this.$el.find('#newInviteForm');
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

        if(options.id != null)
            this.createFromInvite(options.id);
        else
            this.model = new InviteModel();

        if(options.title != null)
            this.model.set('title', options.title);

        //No Report VIew for now
        this.reportView = new ReportView({model:this.model, el: '#reportXXX'});
        //this.reportView.render();

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
                this.model.set('title', data.title);
                this.model.set('where', data.where);

                data.contacts.forEach(function(contact){
                    this.new_contact(contact);
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
    newContact_button: function(){
        if(!validator.validateItem(this.$new_phone))
            return;

        var attendeeAddresses = this.parsePhoneAndEmail(this.$new_phone.val());

        this.newContact({
           name:this.$new_name.val(),
           email: attendeeAddresses.email,
            phone: attendeeAddresses.phone
        });

        this.$new_name.val('');
        this.$new_phone.val('');

        //enabling send button
        this.$btSend.removeAttr("disabled");
        return false;
    },
    newContact: function(contact){
        if (contact == null)
            return;
        contact.index = this.i;
        var new_contact = this.new_contact_string.format(contact.name, contact.email, contact.phone, contact.index);

        this.$table.append(new_contact);
        //this.reportView.addContact(contact);
        this.model.attributes.contacts.push(contact);
        this.i++;
    },

    //Still Not implemented well
    removeContact: function (e) {
        throw new Exception('Error');

        var dataId = "#contact"+ $(e.currentTarget).data('row');
        this.$table.find(dataId).remove();

        this.reportView.removeContact(dataId);

        //disabling send button
        var $rows = this.$el.find('.contact-row');
        if($rows == null || $rows.length == 0)
          this.$btSend.attr("disabled", "disabled");
    },
    submitNew:function(e){
        var that = this;
        console.log(this.model);
        if(!validator.validateItems('.valid-before-submit'))
            return;
        this.model.attributes.start = this.model.get('start-date') + " " +this.model.get('start-time');
        this.model.attributes.end = this.model.get('end-date') + " " +this.model.get('end-time');

        $.ajax({
            url: "/api/invite",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(this.model),
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
