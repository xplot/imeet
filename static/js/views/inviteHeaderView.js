InviteHeaderView = SimpleView.extend({
    template: JST['invite_header.html'],
    el: '#invite-header',

    initialize: function(options){
        this.options = options || {};
    },

    events: {
        '#upload_image_file change': 'image_changed'
    },

    upload_image: function(upload_url){
        var $image_form = $('#upload_image_form');
        var $invite_cover_image = $('.invite-background');

        $.ajax({
            url: upload_url,
            type: "POST",
            data: new FormData($image_form[0]),
            processData: false,
            contentType: false,
            success: function(data) {
                var url = '/image/'+ data + '?'+ new Date().getTime();
                $invite_cover_image.css('background-image','url('+ url + ')');
            },
            error: function(data) {
                alert_notification([{
                    alertType:'danger',
                    message: 'Image couldnt be uploaded'
                }]);
            }
        });
    },

    render: function(invite_model){
        this.model = invite_model;
        var invite_json = this.model.toJSON();
        this.$el.html(this.template(invite_json));

        if(this.options.is_admin)
            $('#image_select_btn').show();
        else
            $('#image_select_btn').hide();

        this.$image_file = this.$el.find('#upload_image_file');
        this.$image_form = this.$el.find('#upload_image_form');
        var that = this;

        var invite_title_view = new InviteTitleView({
            el: '.invite-title-container',
            is_editable: this.options.is_admin
        });
        invite_title_view.render(this.model);

        this.$image_file.on('change', function(){
            $.ajax({
                url: '/image/' + that.$image_form.data('id') + '/upload_url',
                type: "GET",
                success: function(data) {
                    that.upload_image(data);
                },
                error: function(data) {
                    alert_notification([{
                        alertType:'danger',
                        message: 'Image couldnt be uploaded'
                    }]);
                }
            });
        });

        this.$el.find('#image_select_btn').click(function(){
            that.$image_file.click();
        });
    },
});

InviteTitleView = Backbone.View.extend({

    initialize: function(options){
        this.options = options || {is_editable: false};
    },

    render: function(model, edit_view){
        var that = this;
        this.model = model;

        if(!edit_view){
            var label = '<h1 class="main-h1">' + that.model.get('title') + '</h1>';
            this.$el.html(label);

            if(this.options.is_editable) {
                var $label = this.$el.find('.main-h1');
                $label.on('click', function () {
                    that.render(that.model, true);
                });
            }
        }
        else{
            var input = '<input type="text" class="edit-title-input" value="' + that.model.get('title') +  '">';
            this.$el.html(input);
            this.$input = this.$el.find('.edit-title-input');

            var update = function(value){
                that.model.set('title', value);
                that.model.submit(that.submitSuccess, that);
            };

            this.$input.on('blur', function(){
                update(that.$input.val());
            });

            this.$input.on('keyup', function(evt){
                if (evt.keyCode != 13) {
                    return;
                }
                update(that.$input.val());
            });

        }
    },

    submitSuccess: function(view,  result){
        view.render(view.model, false);
    },
});