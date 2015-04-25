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
        'click .invite-attendees-acknowledge-no': 'noButtonClick',
    },

    render: function(data){
        this.model = data.attendees;
        this.current_attendee = data.current_attendee;

        this.separateAttendees();
        var json = {
            no_response: this.no_response.collectionToJSON(),
            confirmed: this.confirmed.collectionToJSON(),
            negated: this.negated.collectionToJSON(),
            attendee: this.current_attendee
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
            else{
                that.no_response.add(item);
            }
        });
    },

    yesButtonClick: function(event) {

    },

    noButtonClick: function(event) {

    },

    attendeeRSVP: function(event) {
        //Here current user has to be matched against one of the attendees in the Invite
        //If not invited the RSVP should not be shown

        //This page in general, can only show if the Invite is "Public"
        //The RSVP dialog can only be shown under the following conditions:
        // 1 - The current User is included in the Invitation
        // 2 - The invite is open to the Public, in which case, the current logged user has to be included in the Invite
        // 3 - The invite is accessed using the attendee link, in which case, the attendee can be obtained directly from the pag.

    }
});
