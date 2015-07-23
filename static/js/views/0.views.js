SimpleView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },
    hidePanels:function(){
        //We hide all view containers
        $('#body-container').hide();
        $('#view-container').show();
        $('#modal_container').hide();
        $('#invite-body').hide();
    },
    clearTemplate:function(){
        $("#view-container").html("");
    },

    block: function (el, ratio) {
        var h = $(window).height();
        if (ratio === 'half')
          h = h/2;
        else if (ratio == 'quarter')
          h = h/3;
        else
            h = h;

        $(el).css('height',h);
    },

    destroy: function(){
      this.remove();
      this.unbind();
    }
});










