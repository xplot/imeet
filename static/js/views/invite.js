InviteView = SimpleView.extend({
    template: JST['inviteReport.html'],
    inviteId:null,
    author: "Organizer",

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    render: function(data){
        this.hidePanels();

        this.inviteId = data.invite_id;
        var contactId = data.contact_id;

        if(this.inviteId == null)
            console.error('Invite Id is null, check routing');

        this.$el.html(this.template());
        var self = this;

        $.ajax({
            url: "/api/invite/" + self.inviteId,
            type: "GET",
            cache: false,
            success: function(data) {

                $('.invite-title').html(data.title);
                $('.invite-location').html(data.where);
                $('.invite-date').html(data.start);

                self.loadContacts(data.contacts, contactId);
                self.currentCommentIndex = data.comments.length;

                self.loadComments(data.comments);
                setInterval(function(){self.getComments(self.inviteId, data.comments.length, self.loadComments)}, 60000);
            }
        });
    },
    addNewComment: function(eventData){
        if(eventData.charCode == 13){

            var author = this.author;
            var commentText = eventData.target.value;
            eventData.target.value = "";

            $('.invite-comments').append('<li class="invite-comment-row"> \
                                            <span class="pull-left invite-comment-author">{0}:</span> \
                                                {1} \
                                         </li>'
                                        .format(author, commentText));
            $('.invite-comments').scrollTop(1000000);

            $.ajax({
                url: "/api/invite/{0}/comment".format(this.inviteId),
                type: "POST",
                contentType: "application/json",
                data: '{"author": "{0}", "comment": "{1}"}'.format(author, commentText),
                cache: false,
                error: function(data) {
                    if(data.status != 200)
                        alert_notification([{
                            alertType:'danger',
                            message: data.responseText
                        }]);
                }
            });
        }
    },
    getComments: function(inviteId, currentCommentIndex, loadComments){
        $.ajax({
            url: "/api/invite/{0}/comments".format(inviteId),
            type: "GET",
            contentType: "application/json",
            cache: false,
            success: function(data) {
                loadComments(data.comments, currentCommentIndex);
            },
            error: function(data) {

            }
        });
    },
    loadContacts: function(contacts, contactId){
        var contact_html = "\
            <div class='row contact-row small-margin' data-contact='{0},{1},{2}' > \
                    <div class='col-xs-2 col-md-1'> \
                        <i class='fa fa-like fa-1_2x {3}'></i> \
                    </div>\
                    <div class='col-xs-10 col-md-12'> \
                             {0} {1} {2} \
                    </div> \
            </div> ";

        var inviteTable = $('.invite-table');
        var self = this;
        contacts.forEach(function(contact){
            if(contact.id == contactId)
                self.author = contact.name || contact.email || contact.phone || "User";

            var status = "";
            if(contact.sms_response == null & contact.voice_reponse == null & contact.email_response == null)
                status = "hidden";

            inviteTable.append(contact_html.format(
                contact.name || '',
                contact.email || '',
                contact.phone || '',
                status
            ));

        });
    },

    loadComments: function(comments, currentCommentIndex){
        var inviteCommentsElement = $('.invite-comments');
        var commentsHTML = "";
        var index = 1;
        var that = this;
        var initial = currentCommentIndex == null;

        comments.forEach(function(comment){
            var should_animate = "";
            if(!initial && index >= currentCommentIndex)
                should_animate = "animate_comment";

            commentsHTML = commentsHTML.concat('\
                <li id="{0}" class="invite-comment-row {3}"> \
                    <span class="pull-left invite-comment-author">{1}:</span> \
                    {2} \
                </li>'.format(comment.id, comment.author, comment.comment, should_animate)
            );
            index++;
        });
        inviteCommentsElement.html(commentsHTML);
        that.currentCommentIndex = comments.lenght;

        inviteCommentsElement.scrollTop(1000000);
    },
    events: {
        "keypress .invite-newComment": "addNewComment"
    }
});
