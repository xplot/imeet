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
        console.log(data.invite_id);
        this.invite_id = data.invite_id;
        this.current_attendee = data.current_attendee;
        this.model = data.comments;

        var json = {
          comments: this.model.collectionToJSON()
        };

        this.$el.html(this.template(json));

        this.$comment_container = this.$el.find('.invite-comments-container');
        this.$comment_input = this.$el.find('.invite-comment-input');
        this.listenTo(this.model, 'add', this.newCommentModel);
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
            author: (this.current_attendee!=null)?this.current_attendee.get('name'):null
        });
        comment.submit(
            this.invite_id,
            (this.current_attendee!=null)?this.current_attendee.get('unique_id'):null
        );

        this.model.add(comment);
        this.$comment_input.val('');
        this.$comment_input.focus();
    },

    newCommentModel: function(commentModel){
        this.$comment_container.prepend(JST['invite_comment.html'](commentModel.toJSON()))
    }
});
