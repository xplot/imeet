InviteAttendeesView = Backbone.View.extend({
    template: JST['invite_attendees.html'],
    el:'#invite-attendees',
    confirmed: null,
    negated: null,
    no_response: null,
    current_attendee: null,

    initialize: function(options){
        this.options = options || {};
    },

    events: {
        'click .invite-attendees-acknowledge-yes': 'yesButtonClick',
        'click .invite-attendees-acknowledge-no': 'noButtonClick'
    },

    render: function(data){
        this.model = data.attendees;
        this.current_attendee = data.current_attendee;

        this.separateAttendees();
        var json = {
            no_response: this.no_response.collectionToJSON(),
            confirmed: this.confirmed.collectionToJSON(),
            negated: this.negated.collectionToJSON(),
            attendee: (this.current_attendee != null)? this.current_attendee.toJSON():null
        };

        this.$el.html(this.template(json));

        this.$table = this.$el.find('.contact-table');
        this.$newContact = $('.contact-input');

        return this.$el.html();
    },

    separateAttendees: function(){
        this.no_response = new ContactList();
        this.negated = new ContactList();
        this.confirmed = new ContactList();
        var that = this;

        this.model.forEach(function(item){
            var status = item.get('status');
            if(status == 'yes'){
                that.confirmed.add(item);
            }
            else if(status == 'no'){
                that.negated.add(item);
            }
            else if(status == 'organizer'){
                item.set('organizer', true);
                that.confirmed.add(item);
            }
            else{
                that.no_response.add(item);
            }
        });
    },

    yesButtonClick: function(event) {
        this.attendeeRSVP('yes');
    },

    noButtonClick: function(event) {
        this.attendeeRSVP('no');
    },

    attendeeRSVP: function(response) {
        if(this.current_attendee == null){
            alert_notification([{
                    alertType:'danger',
                    message: 'Something wrong happened, you shouldnt be able to SAY ' + response + " You are nobody!!!"
            }]);

            return;
        }
        this.current_attendee.set('status', response);

        this.current_attendee.acknowledgeInvite(response, $.proxy(this.attendeeRSVPCallback, this));
    },

    attendeeRSVPCallback: function(){
        var attendee_model = this.model.getById(this.current_attendee.get('unique_id'));
        attendee_model.set('status', this.current_attendee.get('status'));

        this.render({
            attendees: this.model,
            current_attendee: this.current_attendee
        });
    }
});
