function init_app() {

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {}
    };

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'new': 'new',
            'search': 'search',
            'view/:id': 'view'
        },
        index: function () {
            $("a[data-action=\"modal\"]").click(function (e) {
                Backbone.history.navigate($(this).data('where'), true);
            });
        },
        new: function () {
            cv = new CreateView({
                el: "#modal_container",
                templateId: "#new_template"
            });

            new_view = new ModalView({
                el: "#modal_container",
                childView: cv
            });
            new_view.render();
        },
        search: function () {
            search_view = new ModalView({
                el: "#modal_container",
                templateId: '#search_template'
            });
            search_view.render();
        },
        view: function (id) {
            iv = new InviteView({
                el: "#modal_container",
                id: id,
                templateId: "#view_template"
            });

            invite_view = new ModalView({
                el: $("#modal_container"),
                childView: iv
            });

            invite_view.render();
        }
    });

    new App.Router;
    Backbone.history.start({pushState: true});

}