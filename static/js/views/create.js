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
        this.$btSend = this.$el.find('.send');
        this.$contactForm = this.$el.find('#newContactForm');
        this.$inviteForm = this.$el.find('#newInviteForm');
        this.$new_name = this.$el.find('.new-contact-name');
        this.$new_phone = this.$el.find('.new-contact-phone');
        //this.$new_email = this.$el.find('.new-contact-email');
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
            this.model = testModel;

        if(options.title != null)
            this.model.set('title', options.title);

        var reportView = new ReportView({model:this.model, el: '#reportXXX'});
        reportView.render();

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
        if(!validator.validateItem(this.$new_phone))
            return;

        var new_contact = this.new_contact_string.format(this.$new_name.val(),this.$new_phone.val(),this.i);
        this.$new_name.val('');
        this.$new_phone.val('');
        this.$table.append(new_contact);

        this.i++;

        //enabling send button
        this.$btSend.removeAttr("disabled");

        return false;
    },
    removeContact: function (e) {
        var dataId = "#contact"+ $(e.currentTarget).data('row');
        this.$table.find(dataId).remove();

        //disabling send button
        var $rows = this.$el.find('.contact-row');
        if($rows == null || $rows.length == 0)
          this.$btSend.attr("disabled", "disabled");
    },
    submitNew:function(e){
        var that = this;

        if(!validator.validateItems('.valid-before-submit'))
            return;

        var $rows = this.$el.find('.contact-row');
        var event = {
            'title': this.$event_name.val(),
            'when':this.$event_date.val(),
            'user_id': (currentUser!=null)?currentUser.id: null,
            'contacts': []
        };

        $rows.each(function() {
            var dataContact = $(this).data("contact");
            var contactArray = dataContact.trim().split(';');

            var attendeeAddresses = that.parsePhoneAndEmail(contactArray[1]);

            event.contacts.push({
                'name': contactArray[0],
                'email': attendeeAddresses.email,
                'phone': attendeeAddresses.phone
            });
        });

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
