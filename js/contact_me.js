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

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "/contact_form",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                }
            })
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    var $table = $('.contact-table');

    var $new_name = $('.new-contact-name');
    var $new_phone = $('.new-contact-phone');
    var $new_email = $('.new-contact-email');

    var i = 0;
    $('.new-contact').click(function(){
        if($new_email.val() == '' && $new_phone.val() == '')
            return;

        if(!$new_email[0].checkValidity() ||
            !$new_phone[0].checkValidity())
            return;

        var new_contact = "\
            <div id='contact{3}' class='row contact-row small-margin' data-contact='{0},{1},{2}' > \
                    <div class='col-sm-3'> {0} </div> \
                    <div class='col-sm-3'>  {1} </div> \
                    <div class='col-sm-3'> {2}</div> \
                    <div class='col-sm-3'>\
                    <div class='row'> \
                        <div class='col-sm-4'></div>\
                        <div class='col-sm-4'>\
                            <button type='button' class='btn btn-danger form-control remove-contact' data-row='{3}'>-</button>\
                        </div> \
                        <div class='col-sm-4'></div>\
                    </div>\
            </div> ".format($new_name.val(),$new_phone.val(),$new_email.val(),i);

        $new_name.val('');
        $new_email.val('');
        $new_phone.val('');

        $table.append(new_contact);

        $table.find('.remove-contact').click(function(){
            var dataId = "#contact"+$(this).data('row');
            $(dataId).remove();
        });
        i++;

        return false;
    });

    $('.send').click(function(){
        var $event_name = $('.event-name');
        var $event_date = $('.event-date');

        if(!$event_name[0].checkValidity() ||
            !$event_date[0].checkValidity())
            return;

        var $rows = $('.contact-row');
        var event = {
            'title': $event_name.val(),
            'when':$event_date.val(),
            'contacts': []
        };

        $rows.each(function() {
            var dataContact = $( this ).data( "contact" );

            var contactArray = dataContact.split(',');

            event.contacts.push({
                'name':contactArray[0],
                'email':contactArray[2],
                'phone':contactArray[1]
            });
        });

        $.ajax({
                url: "/send",
                type: "POST",
                data: JSON.stringify(event),
                cache: false,
                success: function() {
                    $('.contacts-modal').modal('hide');
                }
            });

        event.preventDefault();
    });

});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

var $newModal = $('#portfolioModal1');
var $searchModal = $('#searchModal');
var $viewModal = $('#viewModal');

(function(){

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
        'view': 'view'
    },
    index: function(){
        $("a[data-action=\"modal\"]").click(function(e) {
            Backbone.history.navigate($(this).data('where'),true);
        });


    },
    new: function(){
        $newModal.modal('show');

        $(".close-modal").click(function(e) {
            $newModal.modal('hide');
            Backbone.history.navigate('',true);
        });
    },
    search: function(){
        $searchModal.modal('show');

        $(".close-modal").click(function(e) {
            $searchModal.modal('hide');
            Backbone.history.navigate('',true);
        });
    },
    view: function(){
        $viewModal.modal('show');

        $(".close-modal").click(function(e) {
            $viewModal.modal('hide');
            Backbone.history.navigate('',true);
        });
    }
});

new App.Router;
Backbone.history.start({pushState: true});



})();
