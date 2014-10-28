
function alert_notification(alerts){
    var $alertDiv = $('#notification-alerts');

    if(!$alertDiv.length){
        $alertDiv = $('<div id="notification-alerts" class="jumbotron flyover flyover-bottom"><button class="btn btn-primary alert-close" data-dismiss="alert">X</button></div>');
        $('body').append($alertDiv);
    }

    alerts.forEach(function(alert){
        $alertDiv.prepend("\
            <div class='alert alert-" + alert.alertType + "'>" +
            alert.message +
            "</div>");
    });

    if(alerts.length > 0)
        $alertDiv.toggleClass('in');
}

var validator = {
    digitsRegex: new RegExp("^[0-9]*$"),
    charsRegex: new RegExp(".*"),
    emailRegex:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    validateItems: function(selector){
        var result = true;
        var $elements_to_validate = $(selector);
        $elements_to_validate.each(function(index){
            var $item = $($elements_to_validate[index]);
            result = validator.validateItem($item) && result ;
        });
        return result;
    },

    validateString:function(fieldValue, validation){
        var passed = false;
        switch(validation){
            case "required":
                passed = fieldValue.length > 0;
                break;
            case "digits":
                passed = validator.digitsRegex.test(fieldValue);
                break;
            case "non_numerics":
                passed = validator.charsRegex.test(fieldValue);
                break;
            case "email":
                passed = fieldValue.length == 0 ||  validator.emailRegex.test(fieldValue);
                break;
            case "phone":
                passed = validator.digitsRegex.test(fieldValue) && (fieldValue.length == 10 || fieldValue.length == 0) ;
                break;
            case "date":
                var date = new Date(fieldValue);
                passed = date instanceof Date && !isNaN(date.valueOf());
                break;
        }

        return passed;
    },
    validateItem:function($item){
        var totalResult = true;

        var validations = $item.data('validation');
        validations.split(',').forEach(function(validation){
            var length = -1;
            if(validation.indexOf(':')>=0){
                var split = validation.split(':');
                validation = split[0];
                length = parseInt(split[1]);
            }

            var passed;
            try
            {
                var fieldValue = $item.val();
                if($item.is(':checkbox')){
                    if(!$item.is(':checked'))
                        fieldValue = "";
                }

                if(validation.indexOf('|') == -1)
                    passed = validator.validateString(fieldValue, validation);
                else {
                    passed = validator.validateString(fieldValue, validation.split('|')[0]) ||
                        validator.validateString(fieldValue, validation.split('|')[1]);
                }

                if(length != -1)
                    passed = passed && fieldValue.length == length;
            }
            catch(err){
                passed = false
            }
            totalResult = passed && totalResult;
        });

        if($item.is(':checkbox')){
            $item = $item.parent();
        }

        if(!totalResult)
                $item.addClass('failed-validation');
            else
                $item.removeClass('failed-validation');

        return totalResult;
    }
}


ModalView = Backbone.View.extend({
    childView: null,
    template: null,

    initialize: function(options){
        this.options = options || {};
        this.childView = this.options.childView;
        this.template = this.options.template;

        if(Backbone.pubSub._events == null || Backbone.pubSub._events['childClose'] == null)
            Backbone.pubSub.on('childClose', this.onChildClose, this);
    },
    render: function(data){
        var this_el = this.$el;
        var that = this;

        if(this.options.templateId != null){
            var template = _.template( $(this.options.templateId).html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        }
        else if(this.template != null)
          this.$el.html(this.template());

        if(this.childView != null){
            this.childView.render(data);
        }

        this.$el.find(".close-modal").click(function(e) {
            that.onChildClose({
                'view': that.childView
            });
        });

        //Finally we show it
        this.$el.modal('show');
        //this.$el.on('hidden.bs.modal', this.onChildClose);
        return this;
    },

    onChildClose:function(data){
        if(this.$el != null)
            this.$el.modal('hide');
        Backbone.history.navigate('',true);
    }

});

SimpleView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },

    render: function (data) {
        //We hide all view containers
        $('#body-container').hide();

        if (this.options.templateId != null) {
            var template = _.template($(this.options.templateId).html(), {});
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
            this.$el.show();
        }
    }
});

IndexView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click .imeet-btn' : 'createNew',
       'keypress .invite-title-input' : 'type_key'
    },

    type_key: function(e){
        if (e.keyCode == 13) {
            this.createNew();
            e.preventDefault();
            return false;
        }
    },

    render: function (data) {
        $('#view-container').hide();
        this.$el.show();

        this.$inviteTitle = this.$el.find('.invite-title-input');
        this.$headerImage = this.$el.find('.header-section');
    },

    createNew: function(){

        var viewName = this.$inviteTitle.val();
        if(viewName != null && viewName != '')
            Backbone.history.navigate('/new/'+ viewName, true);
        else
            alert('type a title!');
    }
});

InviteView = Backbone.View.extend({
    template: JST['inviteReport.html'],
    inviteId:null,

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },
    render: function(data){
        this.inviteId = data.invite_id;

        if(this.inviteId == null)
            console.error('Invite Id is null, check routing');

        this.$el.html(this.template());

        $.ajax({
            url: "/api/invite/" + this.inviteId,
            type: "GET",
            cache: false,
            success: function(data) {
                var inviteTitle = $('.invite-title');
                var inviteDate = $('.invite-date');
                var inviteTable = $('.invite-table');

                inviteTitle.html(data.title);
                inviteDate.html(data.when);

                var contact_html = "\
            <div id='contact{3}' class='row contact-row small-margin' data-contact='{0},{1},{2}' > \
                    <div class='col-sm-2'> {0} </div> \
                    <div class='col-sm-2'>  {1} </div> \
                    <div class='col-sm-2'> {2}</div> \
                    <div class='col-sm-2'> {3}</div> \
                    <div class='col-sm-2'> {4}</div> \
                    <div class='col-sm-2'> {5}</div> \
            </div> ";

                data.contacts.forEach(function(contact){
                    inviteTable.append(contact_html.format(
                        contact.name || 'N/A',
                        contact.phone || 'N/A',
                        contact.email || 'N/A',
                        contact.sms_response || '<span class="text-danger">N/A</span>',
                        contact.voice_response || '<span class="text-danger">N/A</span>',
                        contact.email_response || '<span class="text-danger">N/A</span>'
                    ));
                })

            }
        });
    }
});

CreateView = Backbone.View.extend({
    el: '#header-container',
    new_contact_string: "\
            <div id='contact{2}'  class='row controls' data-contact='{0},{1},{2}'>\
                <div class='col-sm-5 form-group'> {0}</div>\
                <div class='col-sm-5 form-group'> {1}</div>\
                <div class='col-sm-2 form-group'> \
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
        this.$event_date = this.$el.find('.event-date');
        this.$btSend = this.$el.find('.send');
        this.i = 0;

        if(options.title != null)
            this.$event_name.val(options.title);

        if(options.id != null)
            this.createFromInvite(options.id);
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
            var contactArray = dataContact.split(',');

            var attendeeAddresses = that.parsePhoneAndEmail(contactArray[1]);

            event.contacts.push({
                'name': contactArray[0],
                'email': attendeeAddresses.email,
                'phone': attendeeAddresses.phone,
            });
        });
        $.ajax({
            url: "/api/invite",
            type: "POST",
            data: JSON.stringify(event),
            cache: false,
            success: function() {
                that.$el.modal('hide');
                Backbone.history.navigate('',true);
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
        if(isNaN(addresses[0][0]))
          return {email: addresses[0]};
        else
          return {phone: addresses[0]};
      }
      else{ //phone and email at the same time.
        if(!isNaN(addresses[0][0]))
          return {email: addresses[0], phone: addresses[1]};
        else
          return {phone: addresses[0], email: addresses[1]};
      }
    }
});

SearchView = Backbone.View.extend({
    template: JST['search.html'],
    invite_string: "\
            <div class='row'> \
                    <div class='col-sm-3 col-md-offset-2'>  <a href='#' class='navigate' data-action='modal' data-where='view/{0}'>{1}</a> </div> \
                    <div class='col-sm-3'>  {2} </div> \
                    <div class='col-sm-1'> <button type='button' class='navigate btn btn-info form-control' data-where='new/from/{0}'>Copy</button></div> \
            </div> ",
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .search' : 'search',
       'keypress #searchBox' : 'type_key'
    },

    render: function() {
        this.$el.html(this.template());
        this.$searchBox = this.$el.find('#searchBox');
        this.search();
    },

    type_key: function(e){
        if (e.keyCode == 13) {
            this.search();
            e.preventDefault();
            return false;
        }
    },
    search: function(){
        var that = this;
        $.ajax({
            url: "/api/invite/search/"+ currentUser.id + "?term=" + this.$searchBox.val(),
            type: "GET",
            cache: false,
            success: function(data) {
                if(data!=null){
                    var results = $('.search-result');
                    results.empty();
                    data.forEach(function(invite){
                        results.append(that.invite_string.format(
                            invite.unique_id,
                            invite.title,
                            invite.when
                        ));
                    });
                }
            }
        });
    }
});


UserRegisterView = Backbone.View.extend({
    template: JST['register.html'],
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .submit-register' : 'registerEmail'
    },

    render: function() {
        this.$el.html(this.template());

        this.$registerForm = this.$el.find('#registerForm');
        this.$email = this.$el.find('.register-email');
    },

    registerEmail: function(){
        this.$registerForm.validate();
        if(!this.$registerForm.valid())
            return;

        var that = this;
        $.ajax({
            url: "/register/email/"+ this.$email.val(),
            type: "POST",
            cache: false,
            success: function() {
                Backbone.pubSub.trigger('childClose', { 'view' : that } );
            },
            error:function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });

    }
});

UserProfileView = Backbone.View.extend({
    template: JST['editProfile.html'],
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .save-profile' : 'save'
    },

    render: function() {
        this.$el.html(this.template());

        this.$editProfileForm = this.$el.find('#editProfileForm');
        this.$name = this.$el.find('#edit-profile-name');
        this.$username = this.$el.find('#edit-profile-username');
        this.$password = this.$el.find('#edit_profile_password');
        this.$email = this.$el.find('#edit-profile-email');

        var that = this;
        $.ajax({
            url: "/api/profile/"+ currentUser.id,
            type: "GET",
            cache: false,
            success: function(data) {
                if(data.email != null){
                    that.$email.html(data.email);
                    that.$email.parent().addClass('floating-label-form-group-with-value');
                }

                if(data.username != null){
                    that.$username.val(data.username);
                    that.$username.parent().addClass('floating-label-form-group-with-value');
                }

                if(data.name != null){
                    that.$name.val(data.name + " " + data.last_name);
                    that.$name.parent().addClass('floating-label-form-group-with-value');
                }
            }
        });

    },

    save: function(){
        this.$editProfileForm.validate({
            rules: {
                edit_profile_password: {
                    minlength: 5
                },
                edit_profile_password_confirm: {
                    minlength: 5,
                    equalTo: "#edit_profile_password"
                }
            }
        });
        if(!this.$editProfileForm.valid())
            return;
        var user = {
          'username':   this.$username.val(),
          'password':   this.$password.val()
        };

        if(this.$name.val() != null) {
            user.name = this.$name.val().split(' ')[0];
            user.last_name = this.$name.val().split(' ')[1];
        }

        var that = this;
        $.ajax({
            url: "/api/profile/"+ currentUser.id,
            type: "POST",
            data: JSON.stringify(user),
            cache: false,
            success: function(data) {
                Backbone.pubSub.trigger('childClose', { 'view' : that } );
            }
        });

    }
});
