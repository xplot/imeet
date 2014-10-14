
ModalView = Backbone.View.extend({
    childView: null,

    initialize: function(options){
        this.options = options || {};
        this.childView = this.options.childView;
    },
    render: function(){
        var this_el = this.$el;

        if(this.options.templateId != null){
            var template = _.template( $(this.options.templateId).html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        }

        if(this.childView != null){
            this.childView.render();
        }

        this.$el.find(".close-modal").click(function(e) {
            this_el.modal('hide');
            Backbone.history.navigate('',true);
        });

        //Finally we show it
        this.$el.modal('show');
    }
});


InviteView = Backbone.View.extend({
    inviteId:null,

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },
    render: function(){

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
