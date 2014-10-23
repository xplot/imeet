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

    index_view = new IndexView({
        el: "#body-container",
        templateId: "#body-template"
    });

    //Login
    login_view = new IndexView({
        el: "#body-container",
        templateId: "#login"
    });

    //Register
    user_register_view = new UserRegisterView({
        el: "#modal_container"
    });
    register_view = new ModalView({
        el: "#modal_container",
        childView: user_register_view
    });

    //Edit Profile
    user_profile_view = new UserProfileView({
        el: "#modal_container"
    });

    profile_view = new ModalView({
        el: "#modal_container",
        childView: user_profile_view
    });

    //Create Invite
    create_invite_view = new CreateView({
        el: "#modal_container"
    });

    create_invite = new ModalView({
        el: "#modal_container",
        childView: create_invite_view
    });

    //Search
    search_view = new SearchView({
        el: "#modal_container"
    });

    search_view_modal = new ModalView({
        el: "#modal_container",
        childView: search_view
    });

    //Report
    invite_view = new InviteView({
        el: "#modal_container"
    });

    invite_view_modal = new ModalView({
        el: $("#modal_container"),
        childView: invite_view
    });

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            '_=_':'index',
            'new': 'new',
            'new/:title': 'new',
            'search': 'search',
            'login': 'login',
            'profile/edit': 'edit_profile',
            'register': 'register',
            'view/:id': 'view'
        },
        index: function () {
            index_view.render();
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
        new: function (title) {
            create_invite.render({'title':title});
        },
        search: function () {
            search_view_modal.render();
        },
        view: function (id) {
            invite_view_modal.render({'invite_id': id});
        }
    });

    //Stupid Facebook Login Bug
    //http://stackoverflow.com/questions/7485111/weird-url-appended
    if (window.location.hash && window.location.hash == '#_=_') {
        window.location.hash = '';
    }

    new App.Router;
    Backbone.history.start({pushState: true});

    //Notifications
    $('#notification-alerts').toggleClass('in');

    //Navigation Links
     $("body").on('click', ".navigate", function (e) {
         console.log('executing');
        var where = $(this).data('where');
        if(where != null)
            Backbone.history.navigate(where, true);
        else
            Backbone.history.navigate("/", true);
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.end-click').click(function() {
        $('.navbar-toggle:visible').click();
    });

    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

}

$(function() {

    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
      String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
      };
    }

    jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, "Please specify a valid phone number");


    //Initialize Backbone see app.js
    init_app();
});
