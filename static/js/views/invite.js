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
