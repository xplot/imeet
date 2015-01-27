SimpleView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },
    hidePanels:function(){
        //We hide all view containers
        $('#body-container').hide();
        $('#view-container').show();
        $('#modal_container').hide();
    },
    clearTemplate:function(){
        $("#view-container").html("");
    }
});










