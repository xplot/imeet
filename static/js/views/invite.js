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
                inviteDate.html(data.start);

                var contact_html = "\
            <div class='row contact-row small-margin {3}' data-contact='{0},{1},{2}' > \
                    <div class='col-sm-2'> {0} </div> \
                    <div class='col-sm-2'>  {1} </div> \
                    <div class='col-sm-2'> {2}</div> \
            </div> ";

                data.contacts.forEach(function(contact){
                    var status = "";
                    if(contact.sms_response != null || contact.voice_reponse != null || contact.email_response != null)
                        status = "alert-success";
                    inviteTable.append(contact_html.format(
                        contact.name || 'N/A',
                        contact.email || '',
                        contact.phone || '',
                        status
                    ));
                })

            }
        });
    }
});
