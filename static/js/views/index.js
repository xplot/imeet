var palette = [
    'red',
    '#455a64',
    '#03a9f4',
    '#0E2A97',
    '#00ACFF',
    '#FF246C',
    '#75B83B',
];

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
        $('#header').css('background-color', palette[Math.floor((Math.random() * palette.length))]);
    },

    createNew: function(){

        var viewName = this.$inviteTitle.val();
        if(viewName != null && viewName != '')
            Backbone.history.navigate('/new/'+ viewName, true);
        else
            alert('type a title!');
    }
});
