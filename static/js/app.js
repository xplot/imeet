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
        el: "#body-container"
    });

    //Login
    login_view = new LoginView({
        el: "#view-container",
        templateId: "#login"
    });

    //Register
    user_register_view = new UserRegisterView({
        el: "#view-container"
    });

    //Edit Profile
    user_profile_view = new UserProfileView({
        el: "#view-container",
    });

    //Search
    search_view = new SearchView({
        el: "#view-container",
    });

    //Report
    admin_view = new InviteAdminView({
        el: "#invite-body"
    });
    invite_view = new InviteView({
        el: "#invite-body"
    });

    sent_view = new SentView({
        el: "#modal_container"
    });

    sent_view_modal = new ModalView({
        el: $("#modal_container"),
        childView: sent_view
    });

    contacts_view = new ContactsView({
        el: "#contact-list"
    });

    contactsNew_view = new ContactsNewView({
        el: "#contact-new"
    });

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            '_=_':'index',

            'new': 'new',
            'new/:title': 'new',
            'new/:title/from/:id': 'new',
            'new/from/:id': 'new_no_title',
            'sent/:id': 'sent',

            'search': 'search',
            'login': 'login',
            'profile/edit': 'edit_profile',
            'register': 'register',

            'invite/:id/edit': 'view_as_organizer',
            'invite/:id': 'view_as_attendee',
            'invite/:id/:invite_attendee_id': 'view_as_attendee',

            'contacts' : 'contacts',
            'contacts/new' : 'contacts_new'
        },
        index: function () {
            index_view.render();
        },
        //User Profile
        login: function () {
            login_view.render();
        },
        register: function () {
            user_register_view.render();
        },
        edit_profile: function () {
            user_profile_view.render();
        },

        //Invite
        new: function (title,id) {
            //Create Invite
            var newView = new NewView({
                el: "#view-container",
            });
            newView.render({'title':title,'id':id});
        },
        new_no_title: function (id) {
            this.new(null, id);
        },
        sent: function (id) {
          sent_view_modal.childView.model = id;
          sent_view_modal.render();
        },
        search: function () {
            search_view.render();
        },
        view_as_organizer: function (id) {
            var inviteX = (typeof(invite) != "undefined")?invite: null;
            var invite_attendeex = (typeof(invite_attendee) != "undefined")?invite_attendee: null;
            admin_view.render(id, inviteX, invite_attendeex);
        },
        view_as_attendee: function(id, invite_attendee_id){
            var inviteX = (typeof(invite) != "undefined")?invite: null;
            var invite_attendeex = (typeof(invite_attendee) != "undefined")?invite_attendee: null;
            invite_view.render(id, inviteX, invite_attendeex);
        },
        contacts: function(){
            contacts_view.render({contactList: contactList, groupList: groupList});
        },
        contacts_new: function(){
            contactsNew_view.render({contactList:contactList});
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
        var where = $(this).data('where');
        if(where != null)
            Backbone.history.navigate(where, true);
        else
            Backbone.history.navigate("/", true);
    });

    // Closes the Responsive Menu on Menu Item Click
//    $('.end-click').click(function() {
//        $('.navbar-toggle:visible').click();
//    });

    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focu s", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

}

$(function() {
    //Initialize Backbone see app.js
    init_app();
});
