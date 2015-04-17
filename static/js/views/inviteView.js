InviteView = SimpleView.extend({
    template: JST['invite.html'],
    inviteId:null,
    author: "Organizer",

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    render: function(data){
        this.hidePanels();

        this.inviteId = data.invite.unique_id;
        var contactId = data.contact_id;
        var inviteModel = new InviteModel(data.invite);

        if(this.inviteId == null)
            console.error('Invite Id is null, check routing');

        this.$el.html(this.template());
        var self = this;

        var invite_header = new InviteHeaderView();
        var invite_attendees = new InviteAttendeesView();

        invite_header.render(inviteModel);
        invite_attendees.render(
            {
                invite_id: data.unique_id,
                attendees: inviteModel.get('attendees')
            }
        );

        $('.invite-location').html(data.invite.where);
        $('.invite-date').html(data.invite.start);
        $('#invite-description').html(data.invite.description)

        $.ajax({
            url: "/api/invite/" + self.inviteId,
            type: "GET",
            cache: false,
            success: function(data) {


                self.loadContacts(data.attendees, contactId);
                self.currentCommentIndex = data.comments.length;

                self.loadComments(data.comments);
                setInterval(function(){self.getComments(self.inviteId, data.comments.length, self.loadComments)}, 60000);
            }
        });
    },
    addNewComment: function(eventData){
        if(eventData.charCode == 13 && eventData.target.value !== ""){
            var author = (currentUser!=null)? currentUser.fullname : this.author;
            var commentText = eventData.target.value;
            eventData.target.value = "";

            $('.invite-comments').scrollTop(1000000);

            $.ajax({
                url: "/api/invite/{0}/comment".format(this.inviteId),
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(
                {
                    user_id: (currentUser == null)? null: currentUser.id,
                    author: author,
                    comment: commentText
                }),
                cache: false,
                success: function(data){
                    $('.invite-comments').append(JST['comment.html'](data));
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
                    <div class='col-xs-10 col-md-11'> \
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

            commentsHTML = commentsHTML.concat(JST['comment.html']({
                author: comment.author,
                comment: comment.comment
            }));

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
