InviteAttendeesView = Backbone.View.extend({
    template: JST['invite_attendees.html'],
    el:'#invite-attendees',

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    events: {
        'click .invite-attendees-acknowledge': 'attendeeComingClick'
    },

    render: function(data){
        this.model = data.attendees;
        this.invite_id = data.invite_id;
        var json = {
            attendees: this.model.toJSON()
        };
        this.$el.html(this.template(json));

        this.$table = this.$el.find('.contact-table');
        this.$newContact = $('.contact-input');

        return this.$el.html();
    },

    attendeeComingClick: function(event) {
        if(event.target.classList.contains('invite-attendees-acknowledge-yes'))
            alert('yes!');
        else
            alert('no!');
    }
});
