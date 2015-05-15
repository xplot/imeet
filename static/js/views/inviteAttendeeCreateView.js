InviteAttendeeCreateView = Backbone.View.extend({
    template: JST['invite_attendee_create.html'],
    el:'#invite-new-attendee',

    initialize: function(options){
        this.options = options || {};
    },

    events: {

    },

    render: function(){
        var json = {

        };
        console.log(this.$el.html());
        this.$el.html(this.template(json));
    },



});
