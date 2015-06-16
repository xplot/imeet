PaletteView = SimpleView.extend({
    template: JST['palette.html'],
    el: '#palette-container',

    palettes: null,

    initialize: function(options){
        this.options = options || {};
    },

    events: {
        "click .palette-item": "paletteColorSelected",
    },

    render: function(inviteModel, palettes){

        this.model = inviteModel;

        if(palettes == null){
            this.palettes = new PaletteList();
            this.palettes.fetchAll($.proxy(this.palettesLoaded, this));
            return;
        }

        this.palettes = palettes;
        this.$el.html(this.template({palettes: this.palettes.collectionToJSON()}));
        this.$el.fadeIn();
    },

    palettesLoaded: function(palettes){
        this.render(this.model, palettes);
    },

    paletteColorSelected: function(evt){
        //Be extensible here
        evt.preventDefault();
        var $item = $(evt.target);
        var palette = this.getById($item.data('id'));

        var currentPalette = this.model.get('palette');
        if(currentPalette != null){
            $('body').removeClass(currentPalette.name);
        }

        this.model.set('palette', palette.toJSON());
        this.renderPalette(palette)
    },

    renderPalette: function(palette){
        $('body').data('palette', palette.get('name'));
        $('body').addClass(palette.get('name'));
    },

    clearPalette: function(){
        var palette = $('body').data('palette');
        $('body').removeClass(palette);
    },

    opacityColor: function(color){
        return 'rgba(' + parseInt(color.slice(-6,-4),16)
            + ',' + parseInt(color.slice(-4,-2),16)
            + ',' + parseInt(color.slice(-2),16)
            +',0.5)';
    },

    getById: function(id){
        return this.palettes.getById(id);
    }
});
