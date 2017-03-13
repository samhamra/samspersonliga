Template.contact.onRendered(function() {
    var validator = $('.contact-form').validate({
        submitHandler: function(event) {
            var name = $('[name=yourname]').val();
            var email = $('[name=email]').val();
            var message = $('[name=mailmessage]').val();

            console.log(name + " " + email + " " + message)

            Meteor.call('sendEmail',
                email,
                name,
                message,
            );
            Router.go('messagesent');
        },
        rules: {
            yourname: {
                required: true
            },
            email: {
                required: true
            },
            mailmessage: {
                required: true
            }
        }
    });
})
