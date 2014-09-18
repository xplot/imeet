$(function() {

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

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });


    var $table = $('.contact-table');

    var $new_name = $('.new-contact-name');
    var $new_phone = $('.new-contact-phone');
    var $new_email = $('.new-contact-email');

    var i = 0;
    $('.new-contact').click(function(){

        if($new_email.val() == '' && $new_phone.val() == '')
            return;

        var new_contact = "<tr class='contact-row'"
                        + "data-contact='" + $new_name.val() + "," + $new_phone.val() + "," + $new_email.val() + "' >"
                        + "<td>" + $new_name.val()  + "</td>"
                        + "<td>" + $new_phone.val() + "</td>"
                        + "<td>" + $new_email.val() + "</td>"
                        + "<td><button type='button' class='btn btn-danger form-control remove-contact'>-</button>" + "</td>"
                        + "</tr>";

        $new_name.val('');
        $new_email.val('');
        $new_phone.val('');

        $table.append(new_contact);

        $table.find('.remove-contact').click(function(){
            $(this).parent().parent().remove();
        });
        i++;
    });

    $('.send').click(function(){
        var $rows = $('.contact-row');

        var event = {
            'title': $('.event-name').val(),
            'when':$('.event-date').val(),
            'contacts': []
        };

        $rows.each(function() {
            var dataContact = $( this ).data( "contact" );

            event.contacts.push(dataContact.split(','));
        });

        $.ajax({
                url: "/send",
                type: "POST",
                data: JSON.stringify(event),
                cache: false,
                success: function() {
                    $('.contacts-modal').modal('hide');
                }
            })
    });

});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
