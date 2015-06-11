PaletteView = SimpleView.extend({
    template: JST['palette.html'],
    el: '#palette-container',

    palette:
    [
        {
            background_color: '#F44336',
            color: '#fff'

        },
        {
            background_color: '#E91E63',
            color: '#fff'

        },
        {
            background_color: '#9C27B0',
            color: '#fff'

        },
        {
            background_color: '#673AB7',
            color: '#fff'

        },
        {
            background_color: '#3F51B5',
            color: '#fff'

        },
        {
            background_color: '#2196F3',
            color: '#fff'

        },
        {
            background_color: '#03A9F4',
            color: '#000'

        },
        {
            background_color: '#00BCD4',
            color: '#000'

        },
        {
            background_color: '#009688',
            color: '#fff'

        },
        {
            background_color: '#4CAF50',
            color: '#000'

        },
        {
            background_color: '#8BC34A',
            color: '#000'

        },
        {
            background_color: '#CDDC39',
            color: '#000'

        },
        {
            background_color: '#FFEB3B',
            color: '#000'

        },
        {
            background_color: '#FFC107',
            color: '#000'

        },
        {
            background_color: '#FF9800',
            color: '#000'

        },
        {
            background_color: '#FF5722',
            color: '#fff'

        },
        {
            background_color: '#795548',
            color: '#fff'

        },
        {
            background_color: '#9E9E9E',
            color: '#fff'

        },
        {
            background_color: '#607D8B',
            color: '#fff'

        },
        {
            background_color: '#000000',
            color: '#ffffff'

        }
    ],

    initialize: function(options){
        this.options = options || {};
    },

    events: {
        "click .palette-item": "paletteColorSelected",
    },

    render: function(){
        this.$el.html(this.template({palette: this.palette}));
        this.$el.fadeIn();
    },

    paletteColorSelected: function(evt){
        //Be extensible here
        evt.preventDefault();
        var $item = $(evt.target);
        var color = $item.data('color');
        var textColor = $item.data('text');


        $('.palette-editable').css('background-color', color);
        $('.palette-editable').css('color', textColor);

        $('.btn').css('background-color', color);
        $('.btn').css('color', textColor);

        $('.palette-editable[data-opacity="0.7"]').css('background-color', this.opacityColor(color.replace('#', '')));
    },

    opacityColor: function(color){
        return 'rgba(' + parseInt(color.slice(-6,-4),16)
            + ',' + parseInt(color.slice(-4,-2),16)
            + ',' + parseInt(color.slice(-2),16)
            +',0.5)';
    }

});
