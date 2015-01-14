InviteView = Backbone.View.extend({
    template: JST['inviteReport.html'],
    inviteId:null,

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },
    contactToString: function(contact){
        var contactString = "<div>{0} {1} {2} <div style='width: 50px;float: left' class='{3}'>YES</div></div>";

        var confirmed = contact.sms_response != null
            || contact.voice_response != null || contact.email_response!= null
            || false;
        var item_class = "hidden";
        if(confirmed)
            item_class = 'confirmed';

        return contactString.format(
                contact.name || '',
                contact.phone || '',
                contact.email || '',
                item_class
        );
    },
    render: function(data){
        this.inviteId = data.invite_id;

        if(this.inviteId == null)
            console.error('Invite Id is null, check routing');

        this.$el.html(this.template());
        var that = this;
        $.ajax({
            url: "/api/invite/" + this.inviteId,
            type: "GET",
            cache: false,
            success: function(data) {
                var inviteTitle = $('.invite-title');
                var inviteDate = $('.invite-date');
                var inviteTable = $('.invite_report_attendees');

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
                });

                var inviteCommentsElement = $('.invite-comments');
                data.comments.forEach(function(comment){
                    inviteCommentsElement.append('<li id="{0}" class="invite-comment-row"> \
                                                    <span class="pull-left invite-comment-author">{1}:</span> \
                                                    {2} \
                                                  </li>'
                                                  .format(comment.id,
                                                          comment.author,
                                                          comment.comment))
                });

            }
        });
    },
    addNewComment: function(eventData){
        if(eventData.charCode == 13){

            var commentText = eventData.target.value;

            $('.invite-comments').append('<li class="invite-comment-row"> \
                                            <span class="pull-left invite-comment-author">TempUser:</span> \
                                                {0} \
                                         </li>'
                                        .format(commentText));

            $.ajax({
            url: "/api/invite/{0}/comment".format(this.inviteId),
            type: "POST",
            contentType: "application/json",
            data: '{"comment": "{0}"}'.format(commentText),
            cache: false,
            success: function(data) {

            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: data.responseText
                }]);
            }
        });
        }
    },
    events: {
        "keypress .invite-newComment": "addNewComment"
    }
});
