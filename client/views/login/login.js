Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
  }
})

Template.login.onRendered(function(){
  var validator = $('.login-form').validate({
    submitHandler: function(event) {
      var username = $('[name=username]').val();
      var password = $('[name=password]').val();

      Meteor.loginWithPassword(username, password, function(error) {
        if(error) {
          if(error.reason == 'User not found') {
            validator.showErrors({username: error.reason})
          } else if(error.reason == 'Incorrect password') {
            validator.showErrors({password: error.reason})
          }
        } else {
          var currentRoute = Router.current().route.getName();
          if(currentRoute === 'createTopic') {
            Router.go('createTopic');
          } else {
            Router.go('account');
          }
        }
      })
    },
    rules: {
      username: {
        required: true
      },
      password: {
        required: true
      }
    }
  })
})
