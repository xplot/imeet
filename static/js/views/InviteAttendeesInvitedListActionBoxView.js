InviteAttendeesInvitedListActionBoxView = Backbone.View.extend({
    template: JST['invite_attendees_invited_list_actionBox.html'],
    el: "#new-contact-container",
    invite_id: null,

    events: {
       'click .new-contact-btn' : 'notifyAllInvitedAttendees'
    },

    render: function(invite_id) {
        this.invite_id = invite_id;

        this.$el.html(this.template({
            createMode: false
        }));

        this.$el.find('.addContact-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });

        return this.$el;
    },

    show: function () {
        this.$el.find('.addContact-modal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });
    },

    hide: function () {
        this.$el.find('.addContact-modal').modal('hide');
    },

    notifyAllInvitedAttendees: function(){
        alert("invited");
    },

    attendeeUpdated: function(data){
        var message ="Attendee updated!";

        alert_notification([{
            alertType:'success',
            message: message
        }], 5);

        this.model.set("unique_id", data);

        this.hide();

    },
});
