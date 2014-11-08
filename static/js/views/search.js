SearchView = Backbone.View.extend({
    template: JST['search.html'],
    invite_string: "\
            <div class='row'> \
                    <div class='col-sm-3 col-md-offset-2'>  <a href='#' class='navigate' data-action='modal' data-where='view/{0}'>{1}</a> </div> \
                    <div class='col-sm-3'>  {2} </div> \
                    <div class='col-sm-1'> <button type='button' class='navigate btn btn-info form-control' data-where='new/from/{0}'>Copy</button></div> \
            </div> ",
    initialize: function(options){
        this.options = options || {};
    },
    events: {
       'click .search' : 'search',
       'keypress #searchBox' : 'type_key'
    },

    render: function() {
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
                if(data!=null){
                    var results = $('.search-result');
                    results.empty();
                    data.forEach(function(invite){
                        results.append(that.invite_string.format(
                            invite.unique_id,
                            invite.title,
                            invite.when
                        ));
                    });
                }
            }
        });
    }
});