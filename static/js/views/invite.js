InviteView = Backbone.View.extend({
    template: JST['inviteReport.html'],
    inviteId:null,
    author: "Organizer",

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

                self.loadComments(data.comments);
                setInterval(function(){self.getComments(self.inviteId, self.loadComments)}, 60000);
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
    loadContacts: function(contacts, contactId){
        var contact_html = "\
            <div class='row contact-row small-margin' data-contact='{0},{1},{2}' > \
                    <div class='col-xs-2'> \
                        <i class='fa fa-like fa-1_2x {3}'></i> \
                    </div>\
                    <div class='col-xs-6'> \
                             {0} {1},{2} \
                    </div> \
            </div> ";

        var inviteTable = $('.invite-table');
        var self = this;
        contacts.forEach(function(contact){
            if(contact.id == contactId)
                self.author = contact.name || contact.email || contact.phone || "User";

            var status = "";
            if(contact.sms_response == null & contact.voice_reponse != null & contact.email_response != null)
                status = "hidden";
            inviteTable.append(contact_html.format(
                contact.name || '',
                contact.email || '',
                contact.phone || '',
                status
            ));

        });
    },
    loadComments: function(comments){
        var inviteCommentsElement = $('.invite-comments');
        var commentsHTML = "";
        comments.forEach(function(comment){
            commentsHTML = commentsHTML.concat('\
                <li id="{0}" class="invite-comment-row"> \
                    <span class="pull-left invite-comment-author">{1}:</span> \
                    {2} \
                </li>'.format(comment.id, comment.author, comment.comment)
            )
        });
        inviteCommentsElement.html(commentsHTML);
    },
    events: {
        "keypress .invite-newComment": "addNewComment"
    }
});
