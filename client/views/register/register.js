
Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
  }
})

Template.register.onRendered(function() {
  var validator = $('.register-form').validate({
    submitHandler: function(event) {
      var username = $('[name=username]').val();
      var password = $('[name=password]').val();
      Meteor.call('createAUser', username, password, function(error) {
        if(error) {
          validator.showErrors({
            username: error.reason
          })
        } else {
          console.log(username);
          console.log(password);
          Meteor.loginWithPassword(username, password, function(error) {
            console.log(error);
          })
          Router.go('account');
        }

      })
    },
    rules: {
      username: {
        required: true,
        minlength: 5,
        maxlength: 15
      },
      password: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      username: {
        required: "You must enter a username",
        minlength: "Your username must contain at least {0} characters",
        maxlength: "Your username must contain at most {0} characters"
      },
      password: {
        required: "You must enter a password",
        minlength: "Your password must contain at least {0} characters"
      }

    }
  })
})
