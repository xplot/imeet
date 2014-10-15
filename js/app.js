function init_app() {
    //Space
    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {}
    };

    Backbone.pubSub = _.extend({}, Backbone.Events);
    // Hide backbone implementation by aliasing
    Backbone.pubSub.publish     = Backbone.pubSub.trigger;
    Backbone.pubSub.subscribe   = Backbone.pubSub.bind;
    Backbone.pubSub.unsubscribe = Backbone.pubSub.unbind;

    //Views

    //Login
    login_view = new ModalView({
        el: "#modal_container",
        templateId: "#login"
    });

    //Register
    user_register_view = new UserRegisterView({
        el: "#modal_container",
        templateId: "#register"
    });
    register_view = new ModalView({
        el: "#modal_container",
        childView: user_register_view
    });

    //Edit Profile
    user_profile_view = new UserProfileView({
        el: "#modal_container",
        templateId: "#edit-profile"
    });

    profile_view = new ModalView({
        el: "#modal_container",
        childView: user_profile_view
    });

    //Create Invite
    create_invite_view = new CreateView({
        el: "#modal_container",
        templateId: "#new_template"
    });

    create_invite = new ModalView({
        el: "#modal_container",
        childView: create_invite_view
    });

    //Search
    search_view = new SearchView({
        el: "#modal_container",
        templateId: '#search_template'
    });

    search_view_modal = new ModalView({
        el: "#modal_container",
        childView: search_view
    });

    //Report
    invite_view = new InviteView({
        el: "#modal_container",
        templateId: "#view_template"
    });

    invite_view_modal = new ModalView({
        el: $("#modal_container"),
        childView: invite_view
    });

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'new': 'new',
            'search': 'search',
            'login': 'login',
            'profile/edit': 'edit_profile',
            'register': 'register',
            'view/:id': 'view'
        },
        index: function () {

        },

        //User Profile
        login: function () {
            login_view.render();
        },
        register: function () {
            register_view.render();
        },
        edit_profile: function () {
            profile_view.render();
        },

        //Invite
        new: function () {
            create_invite.render();
        },
        search: function () {
            search_view_modal.render();
        },
        view: function (id) {
            invite_view_modal.render({'invite_id': id});
        }
    });

    new App.Router;
    Backbone.history.start({pushState: true});

    $("body").on('click', ".navigate", function (e) {
        console.log('executing');
        Backbone.history.navigate($(this).data('where'), true);
    });
}