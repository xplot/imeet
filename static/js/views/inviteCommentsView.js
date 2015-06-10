InviteCommentsView = Backbone.View.extend({
    template: JST['invite_comments.html'],
    el:'#invite-comments',

    invite_id: null,
    current_attendee: null,

    initialize: function(options){
        this.options = options || {};
    },

    events: {
        'click .add-comment': 'addComment',
        'keyup .invite-comment-input': 'addCommentEnter'

    },

    render: function(data){

        this.invite_id = data.invite_id;
        this.current_attendee = data.current_attendee;
        this.model = data.comments;

        var json = {
          current_attendee: this.current_attendee,
          comments: this.model.collectionToJSON()
        };

        if(this.current_attendee == null && currentUser != null){
            var inviteModel = new InviteModel({unique_id: this.invite_id});
            inviteModel.tryToObtainAttendeeFromLoggedUser($.proxy(this.attendeeFromUser, this));
        }

        this.$el.html(this.template(json));

        this.$comment_container = this.$el.find('.invite-comments-container');
        this.$comment_input = this.$el.find('.invite-comment-input');
        this.listenTo(this.model, 'add', this.newCommentModel);
    },

    attendeeFromUser: function(attendee){

        if (typeof(attendee) == "undefined")
            return;

        this.current_attendee = new Contact(attendee);

        if(this.current_attendee != null){
            $('.invite-comment-input').prop( "disabled", false );
            $('.add-comment').prop( "disabled", false );
        }
    },

    addCommentEnter: function(evt){
        if (evt.keyCode != 13) {
            return;
        }
        this.addComment();
    },
    addComment: function(){
        if(this.$comment_input.val() == '')
            return;

        var comment = new CommentModel({
            comment: this.$comment_input.val(),
            author: this.current_attendee.someIdentifier()
        });

        comment.submit(
            this.invite_id,
            this.current_attendee.get('invite_attendee_id')
        );

        this.model.add(comment);
        this.$comment_input.val('');
        this.$comment_input.focus();
    },

    newCommentModel: function(commentModel){
        this.$comment_container.prepend(JST['invite_comment.html'](commentModel.toJSON()))
    }
});
