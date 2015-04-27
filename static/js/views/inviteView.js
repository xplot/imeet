InviteView = SimpleView.extend({
    template: JST['invite.html'],
    invite_id:null,
    current_attendee: null,

    initialize: function(options){
        this.options = options || {};
        this.inviteId = this.options.id;
    },

    hidePanels:function(){
        //We hide all view containers
        $('#body-container').hide();
        $('#view-container').hide();
        $('#modal_container').hide();
        $('#invite-body').show();
    },

    render: function(unique_id, invite, invite_attendee){
        this.hidePanels();
        var self = this;
        this.invite_id = unique_id;
        if(invite_attendee != null)
            this.current_attendee = new Contact(invite_attendee);

        if(this.invite_id == null)
            console.error('Invite Id is null, check routing');

        if(invite == null){
            var inviteModel = new InviteModel({unique_id: this.invite_id});
            inviteModel.fetch($.proxy(this.render, this));
            return;
        }

        var inviteModel = new InviteModel(invite);
        this.$el.html(this.template());

        var invite_header = new InviteHeaderView();
        var invite_attendees = new InviteAttendeesView();
        var invite_comments = new InviteCommentsView();

        invite_header.render(inviteModel);
        invite_attendees.render(
            {
                invite_id: this.invite_id,
                attendees: inviteModel.get('attendees'),
                current_attendee: this.current_attendee
            }
        );
        invite_comments.render({
            invite_id: this.invite_id,
            current_attendee: this.current_attendee,
            comments: new CommentList(invite.comments)
        });

        $('#invite-location').html(invite.where);
        $('.invite-date').html(invite.start);
        $('.invite-end-date').html(invite.end);
        $('#invite-description').html(invite.description);

        this.plugins();
    },


    //getComments: function(inviteId, currentCommentIndex, loadComments){
    //    $.ajax({
    //        url: "/api/invite/{0}/comments".format(inviteId),
    //        type: "GET",
    //        contentType: "application/json",
    //        cache: false,
    //        success: function(data) {
    //            loadComments(data.comments, currentCommentIndex);
    //        },
    //        error: function(data) {
    //
    //        }
    //    });
    //},

    //
    //loadComments: function(comments, currentCommentIndex){
    //    var inviteCommentsElement = $('.invite-comments');
    //    var commentsHTML = "";
    //    var index = 1;
    //    var that = this;
    //    var initial = currentCommentIndex == null;
    //
    //    comments.forEach(function(comment){
    //        var should_animate = "";
    //        if(!initial && index >= currentCommentIndex)
    //            should_animate = "animate_comment";
    //
    //        commentsHTML = commentsHTML.concat(JST['comment.html']({
    //            author: comment.author,
    //            comment: comment.comment
    //        }));
    //
    //        index++;
    //    });
    //    inviteCommentsElement.html(commentsHTML);
    //    that.currentCommentIndex = comments.lenght;
    //
    //    inviteCommentsElement.scrollTop(1000000);
    //},
    events: {
        "keypress .invite-newComment": "addNewComment"
    },

    plugins: function(){
        var that = this;
        that.block('.invite-background', 'half');

        $(window).resize(function() {
            that.block('.invite-background', 'half');

        });
    }
});
