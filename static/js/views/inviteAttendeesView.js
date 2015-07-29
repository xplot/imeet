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
        'click .edit-attendee': 'editAttendeeClick',
        'click .invited-recipients-notification': 'invitedRecipientsNotificationClick'

    },

    render: function(data){
        this.inviteModel = data.invite;
        this.model = data.attendees;
        this.current_attendee = data.current_attendee;
        this.invite_id = data.invite_id;
        this.edit_view = data.edit_view;
        this.separateAttendees();
        this.pending_notifications = this.computePendingNotifications();

        var json = {
            no_response: this.no_response.collectionToJSON(),
            confirmed: this.confirmed.collectionToJSON(),
            negated: this.negated.collectionToJSON(),
            attendee: (this.current_attendee != null)? this.current_attendee.toJSON():null,
            edit_view: this.edit_view,
            pending_notifications: this.pending_notifications
        };

        this.$el.html(this.template(json));

        this.$table = this.$el.find('.contact-table');
        this.$newContact = $('.contact-input');

        this.listenTo(this.model, 'add', this.attendeeCreated);
        this.listenTo(this.model, 'remove', this.attendeeRemoved);
        this.listenTo(this.model, 'change', this.attendeeUpdated);

        this.plugins();

        /*var toolTipContainer = $('[data-toggle="tooltip"]');
        if(toolTipContainer)
            toolTipContainer.tooltip()*/

        if(this.edit_view
            && this.current_attendee != null
            && this.current_attendee.get("status" ) == 'organizer'
            && this.pending_notifications.has_any)
            $(".invited-recipients-notification").removeClass("hide");

        return this.$el.html();
    },

    setCurrentAttendee: function(invite_attendee){
        this.current_attendee = invite_attendee;
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

    attendeeCreated: function(attendeeModel){
        this.no_response.add(attendeeModel);
        $('.no-response-table').prepend(
            JST['invite_attendee_admin.html'](attendeeModel.toJSON())
        );

        flashElement("[data-rowid='" + attendeeModel.get('invite_attendee_id') + "'] .details");

        this.pending_notifications.total = this.pending_notifications.total + 1;
        $("#total_pending_notifications").text(this.pending_notifications.total);
        if(this.edit_view
            && this.current_attendee != null
            && this.current_attendee.get("status" ) == 'organizer'
            && this.pending_notifications.total == 1) {
            $(".invited-recipients-notification").removeClass("hide");
        }
    },

    attendeeRemoved: function(e){
        var dataId = $(e.currentTarget).data('rowid');
        var contactModel = this.model.getById(dataId);
        contactModel.removeFromInvite(this.invite_id);

        this.model.removeBy(dataId);

        if(this.edit_view
            && this.current_attendee != null
            && this.current_attendee.get("status" ) == 'organizer'
            && !this.pending_notifications.total == 1
            && !contactModel.get("notified")) {
            $(".invited-recipients-notification").hide();
            this.pending_notifications.total = this.pending_notifications.total - 1;
        }
    },

    attendeeUpdated: function(attendee){
        var $attendee_row = $('a[data-rowid="'+ attendee.get('invite_attendee_id') + '"');
        $attendee_row.html($(JST['invite_attendee_admin.html'](attendee.toJSON())).html());
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
    },

    attendeeDetailsView: function(){
        if(this._attendeeDetailsView == null)
          this._attendeeDetailsView = new AttendeeDetailsView();
        return this._attendeeDetailsView;
    },

    inviteAttendeesInvitedListActionBoxView: function(){
        if(this._inviteAttendeesInvitedListActionBoxView == null)
          this._inviteAttendeesInvitedListActionBoxView = new InviteAttendeesInvitedListActionBoxView();
        return this._inviteAttendeesInvitedListActionBoxView;
    },

    editAttendeeClick: function(e){
        var dataId = $(e.currentTarget).data('rowid');
        var contactModel = this.model.getByAttendeeId(dataId);

        var attendeeEditView = this.attendeeDetailsView();
        attendeeEditView.render(this.invite_id, contactModel);
    },

    invitedRecipientsNotificationClick: function(){
        //var inviteAttendeesInvitedListActionBoxView = this.inviteAttendeesInvitedListActionBoxView();
        //inviteAttendeesInvitedListActionBoxView.render(this.invite_id);

        this.inviteModel.notifySome($.proxy(this.notifySomeCallback, this));
    },

    notifySomeCallback:function(notified_attendee_list){

        this.pending_notifications.total = 0;

        var json = {
            no_response: this.no_response.collectionToJSON(),
            confirmed: this.confirmed.collectionToJSON(),
            negated: this.negated.collectionToJSON(),
            attendee: (this.current_attendee != null)? this.current_attendee.toJSON():null,
            edit_view: this.edit_view,
            pending_notifications:{total: 0}
        };

        this.$el.html(this.template(json));

        alert_notification([{
            alertType:'success',
            message: "Everyone in the invite is going to be notified in the next few minutes"
        }],5000
        );
    },

    computePendingNotifications: function () {
        var pending = 0;
        this.no_response.each(function(attendee){
            if(!attendee.get("notified"))
                pending = pending + 1;
        });

        return {
            has_any: pending > 0,
            total: pending
        }
    },

    plugins: function(){

    }
});
