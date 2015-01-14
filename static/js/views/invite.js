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
        var loadComments = this.loadComments;
        var getComments = this.getComments;
        var inviteId = this.inviteId;

        $.ajax({
            url: "/api/invite/" + inviteId,
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
                });

                loadComments(data.comments);
                setInterval(function(){getComments(inviteId, loadComments)}, 5000);
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
    getComments: function(inviteId, loadComments){
        $.ajax({
            url: "/api/invite/{0}/comments".format(inviteId),
            type: "GET",
            contentType: "application/json",
            cache: false,
            success: function(comments) {
                loadComments(comments);
            },
            error: function(data) {
                //log the error
            }
            });
    },
    loadComments: function(comments){
        var inviteCommentsElement = $('.invite-comments');
        var commentsHTML = "";
        comments.forEach(function(comment){
            commentsHTML = commentsHTML.concat('<li id="{0}" class="invite-comment-row"> \
                                            <span class="pull-left invite-comment-author">{1}:</span> \
                                            {2} \
                                          </li>'
                                          .format(comment.id,
                                                  comment.author,
                                                  comment.comment))
        });
        inviteCommentsElement.html(commentsHTML);
    },
    events: {
        "keypress .invite-newComment": "addNewComment"
    }
});
