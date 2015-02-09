SearchView = SimpleView.extend({
    template: JST['search.html'],
    invite_string: "\
            <div class='row' style='margin-top: 20px'> \
                <div class='col-xs-10 col-xs-offset-1 col-md-3 col-md-offset-1'>  <a href='#' class='navigate' data-action='modal' data-where='view/{0}'>{1}</a> </div> \
                <div class='col-xs-6 col-md-2 desktop tablet'>  {2} </div> \
                <div class='col-xs-6 col-xs-offset-2 col-md-2'> <button type='button' class='navigate btn btn-info form-control' data-where='new/from/{0}'>Duplicate</button></div> \
            </div>\
            <div class='small-margin-top'> </div> \
    ",
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .search' : 'search',
       'keypress #searchBox' : 'type_key'
    },

    render: function() {
        this.hidePanels();

        this.$el.html(this.template());
        this.$searchBox = this.$el.find('#searchBox');
        this.search();
    },

    type_key: function(e){
        if (e.keyCode == 13) {
            this.search();
            e.preventDefault();
            return false;
        }
    },
    search: function(){
        var that = this;
        $.ajax({
            url: "/api/invite/search/"+ currentUser.id + "?term=" + this.$searchBox.val(),
            type: "GET",
            cache: false,
            success: function(data) {
                var results = $('.search-result');
                if(data!=null){
                    results.html('');
                    results.empty();
                    data.forEach(function(invite){

                        results.append(that.invite_string.format(
                            invite.unique_id,
                            invite.title,
                            invite.start,
                            invite.end
                        ));

                    });
                }else{
                    results.html('You dont have any iMeets. Start sending! <a href="/new" type="button" class="btn btn-success">Start</a>');
                }
            }
        });
    }
});