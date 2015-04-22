InviteAttendeesView = Backbone.View.extend({
    template: JST['invite_attendees.html'],
    el:'#invite-attendees',

    initialize: function(options){
        this.options = options || {};
    },

    events: {
        'click .invite-attendees-acknowledge': 'attendeeComingClick'
    },

    render: function(data){
        this.model = data.attendees;
        var json = {
            attendees: this.model.toJSON()
        };
        this.$el.html(this.template(json));

        this.$table = this.$el.find('.contact-table');
        this.$newContact = $('.contact-input');

        return this.$el.html();
    },

    attendeeComingClick: function(event) {
        var attending = event.target.classList.contains('invite-attendees-acknowledge-yes');
        $.ajax({
            url: "/api/notification",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(
            {
                attending: attending
            }),
            cache: false,
            success: function(data){
                alert('success');
            },
            error: function(data) {
                if(data.status != 200)
                    alert_notification([{
                        alertType:'danger',
                        message: data.responseText
                    }]);
            }
        });
    }
});
