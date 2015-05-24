InviteDescriptionView = Backbone.View.extend({
    is_editable: true,

    initialize: function(options){
        this.options = options || {};
    },

    render: function(model, edit_view){
        var that = this;
        this.model = model;

        if(!edit_view){
            var label = '<span class="editable invite-description-value">' + that.model.get('description') + '</span>';
            this.$el.html(label);

            if(this.is_editable) {
                var $label = this.$el.find('.invite-description-value');
                $label.on('click', function () {
                    that.render(that.model, true);
                });
            }
        }
        else{
            var input = '<textarea type="text" class="edit-invite-description-input">' + that.model.get('description') +  '</textarea>';
            this.$el.html(input);
            this.$input = this.$el.find('.edit-invite-description-input');

            var update = function(value){
                that.model.set('description', value);
                that.model.updateDescription($.proxy(that.submitSuccess, that));
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

    submitSuccess: function(result){
        this.render(this.model, false);
    },
});