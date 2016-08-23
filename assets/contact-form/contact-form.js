$(function() {
    // Get the form.
    var form = $('#contact-form');

    var formMessages = $('#form-messages');

    $(form).submit(function(event) {

        // Stop the browser from submitting the form.
        event.preventDefault();
        $(formMessages).hide();
        $('.error').removeClass('error');

        var formData = $(form).serialize();
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('alert').addClass('success');
            $(formMessages).text('Grazie per averci contattato, ci faremo sentire al più presto!');
            $(formMessages).show();
            $(form)[0].reset();
        }).fail(function(data) {

            // Set the message text.
            if (data.responseText !== '') {
                try {
                    var responseJSON = jQuery.parseJSON(data.responseText);
                    for (var key in responseJSON) {
                        if (responseJSON.hasOwnProperty(key)) {
                            $('#' + key).removeClass('success').addClass('error').after('<small class="error">' + responseJSON[key] + '</small>');
                        }
                    }
                }
                catch(err) {
                    $(formMessages).fadeIn();
                    $(formMessages).removeClass('success').addClass('alert');
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            } else {
                $(formMessages).removeClass('success').addClass('alert');
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
});
