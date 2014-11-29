var palette = [
    {bg:'#263238',color:'white'},
    {bg:'#3E2723',color:'white'},
    {bg:'#DD2C00',color:'black'},
    {bg:'#FF6D00',color:'black'},
    {bg:'#64DD17',color:'black'},
    {bg:'#33691E',color:'white'},
    {bg:'#827717',color:'white'},
    {bg:'#00BFA5',color:'black'},
    {bg:'#009688',color:'white'},
    {bg:'#006064',color:'white'},
    {bg:'#01579B',color:'white'},
];

InlineInviteView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },
    template: JST['invite_inline_create.html'],
    render: function (data) {

        return this.template();
    }
});

IndexView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
    },
    events: {
       'click .imeet-btn' : 'createNew',
       'keypress .invite-title-input' : 'type_key'
    },

    type_key: function(e){
        if (e.keyCode == 13) {
            this.createNew();
            e.preventDefault();
            return false;
        }
    },

    render: function (data) {
        var inline_view = new InlineInviteView({});
        this.$el.append(inline_view.render());

        var index = Math.floor((Math.random() * palette.length));
        this.$el.find('.palette_background').css('background-color', palette[index].bg);
        this.$el.find('.palette_foreground').css('color', palette[index].color);
    },

    createNew: function(){

        var viewName = this.$inviteTitle.val();
        if(viewName != null && viewName != '')
            Backbone.history.navigate('/new/'+ viewName, true);
        else
            alert('type a title!');
    }
});
