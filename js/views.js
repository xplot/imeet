
ModalView = Backbone.View.extend({
    childView: null,

    initialize: function(options){
        this.options = options || {};
        this.childView = this.options.childView;

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
    },

    onChildClose:function(data){
        console.log('Got to the closing trigger');
        this.$el.modal('hide');
        Backbone.history.navigate('',true);
    }

});


InviteView = Backbone.View.extend({
    inviteId:null,

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },
    render: function(data){
        this.inviteId = data.invite_id;

        if(this.inviteId == null)
            console.error('Invite Id is null, check routing');

        if(this.options.templateId != null){
            var template = _.template( $(this.options.templateId).html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        }

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

        /*if(this.options.templateId != null){
            var template = _.template( $(this.options.templateId).html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        }*/

        this.$el.html(this.template());
        //this.$el.html(this.template(options));

        this.$table = this.$el.find('.contact-table');
        this.$contactForm = this.$el.find('#newContactForm');
        this.$inviteForm = this.$el.find('#newInviteForm');
        this.$new_name = this.$el.find('.new-contact-name');
        this.$new_phone = this.$el.find('.new-contact-phone');
        this.$new_email = this.$el.find('.new-contact-email');
        this.$event_name = this.$el.find('.event-name');
        this.$event_date = this.$el.find('.event-date');
        this.i = 0;

        return this;
    },
    newContact: function(){
         if(this.$new_email.val() == '' && this.$new_phone.val() == '')
                return;

            this.$contactForm.validate({
                rules: {
                    newPhone: {
                        phoneUS: true
                    }
                }
            });

            if(!this.$contactForm.valid())
                return;

            var new_contact = "\
                <div id='contact{3}' class='row contact-row small-margin' data-contact='{0},{1},{2}' > \
                        <div class='col-sm-3'> {0} </div> \
                        <div class='col-sm-3'>  {1} </div> \
                        <div class='col-sm-3'> {2}</div> \
                        <div class='col-sm-3'>\
                        <div class='row'> \
                            <div class='col-sm-4'></div>\
                            <div class='col-sm-4'>\
                                <button type='button' class='btn btn-danger form-control remove-contact' data-row='{3}'>-</button>\
                            </div> \
                            <div class='col-sm-4'></div>\
                        </div>\
                </div> ".format(this.$new_name.val(),this.$new_phone.val(), this.$new_email.val(),this.i);

            this.$new_name.val('');
            this.$new_email.val('');
            this.$new_phone.val('');

            this.$table.append(new_contact);

            this.i++;

            return false;
    },
    removeContact: function (e) {
        var dataId = "#contact"+ $(e.currentTarget).data('row');
        this.$table.find(dataId).remove();
    },
    submitNew:function(e){
        var that = this;

        this.$inviteForm.validate({
            rules: {
                when: {
                  required: true,
                  date: true
                }
            }
        });

        if(!this.$inviteForm.valid())
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

            event.contacts.push({
                'name':contactArray[0],
                'email':contactArray[2],
                'phone':contactArray[1]
            });
        });
        console.log(event);
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
    }
});

SearchView = Backbone.View.extend({
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .search' : 'search'
    },

    render: function() {
        if(this.options.templateId != null){
            var template = _.template( $(this.options.templateId).html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        }
        this.$searchForm = this.$el.find('#searchForm');
        this.$searchBox = this.$el.find('#searchBox');
    },
    search: function(){
        this.$searchForm.validate();
        if(!this.$searchForm.valid())
            return;

        $.ajax({
            url: "/api/invite/search/"+this.$searchBox.val(),
            type: "POST",
            data: JSON.stringify(event),
            cache: false,
            success: function(data) {
                console.log(data);
            }
        });
    }
});


UserRegisterView = Backbone.View.extend({
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .submit-register' : 'registerEmail'
    },

    render: function() {
        if(this.options.templateId != null){
            var template = _.template( $(this.options.templateId).html(), {} );
            this.$el.html(template);

            this.$registerForm = this.$el.find('#registerForm');
            this.$email = this.$el.find('.register-email');
        }
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
                console.log('closing child');
                Backbone.pubSub.trigger('childClose', { 'view' : that } );
            }
        });

    }
});

UserProfileView = Backbone.View.extend({
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .save-profile' : 'save'
    },

    render: function() {
        if(this.options.templateId != null){
            var template = _.template( $(this.options.templateId).html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);

            this.$editProfileForm = this.$el.find('#editProfileForm');
            this.$name = this.$el.find('#edit-profile-name');
            this.$username = this.$el.find('#edit-profile-username');
            this.$password = this.$el.find('#edit_profile_password');
            this.$email = this.$el.find('#edit-profile-email');
        }

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