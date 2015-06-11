PaletteView = SimpleView.extend({
    template: JST['palette.html'],
    el: '#palette-container',

    palette:
    [
        {
            id: 0,
            background_color: '#F44336',
            color: '#fff'

        },
        {
            id: 1,
            background_color: '#E91E63',
            color: '#fff'

        },
        {
            id: 2,
            background_color: '#9C27B0',
            color: '#fff'

        },
        {
            id: 3,
            background_color: '#673AB7',
            color: '#fff'

        },
        {
            id: 4,
            background_color: '#3F51B5',
            color: '#fff'

        },
        {
            id: 5,
            background_color: '#2196F3',
            color: '#fff'

        },
        {
            id: 6,
            background_color: '#03A9F4',
            color: '#000'

        },
        {
            id: 7,
            background_color: '#00BCD4',
            color: '#000'

        },
        {
            id: 8,
            background_color: '#009688',
            color: '#fff'

        },
        {
            id: 9,
            background_color: '#4CAF50',
            color: '#000'

        },
        {
            id: 10,
            background_color: '#8BC34A',
            color: '#000'

        },
        {
            id: 11,
            background_color: '#CDDC39',
            color: '#000'

        },
        {
            id: 12,
            background_color: '#FFEB3B',
            color: '#000'

        },
        {
            id: 13,
            background_color: '#FFC107',
            color: '#000'

        },
        {
            id: 14,
            background_color: '#FF9800',
            color: '#000'

        },
        {
            id: 15,
            background_color: '#FF5722',
            color: '#fff'

        },
        {
            id: 16,
            background_color: '#795548',
            color: '#fff'

        },
        {
            id: 17,
            background_color: '#9E9E9E',
            color: '#fff'

        },
        {
            id: 18,
            background_color: '#607D8B',
            color: '#fff'

        },
        {
            id: 19,
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

    render: function(inviteModel){
        this.model = inviteModel;


        this.$el.html(this.template({palette: this.palette}));
        this.$el.fadeIn();
    },

    paletteColorSelected: function(evt){
        //Be extensible here
        evt.preventDefault();
        var $item = $(evt.target);
        var palette = this.getById($item.data('id'));

        this.model.set('style', palette);
        this.renderPalette(palette)
    },

    renderPalette: function(palette){
        console.log($('.palette-editable'));

        $('.palette-editable').css('background-color', palette.background_color);
        $('.palette-editable').css('color', palette.color);

        $('.btn').css('background-color', palette.background_color);
        $('.btn').css('color', palette.color);

        $('.palette-editable[data-opacity="0.7"]').css('background-color', this.opacityColor(palette.background_color.replace('#', '')));
    },

    opacityColor: function(color){
        return 'rgba(' + parseInt(color.slice(-6,-4),16)
            + ',' + parseInt(color.slice(-4,-2),16)
            + ',' + parseInt(color.slice(-2),16)
            +',0.5)';
    },

    getById: function(id){
        for(var i=0;i<this.palette.length;i++){
            if(this.palette[i].id == id)
                return this.palette[i];
        }
        return null;
    }
});
