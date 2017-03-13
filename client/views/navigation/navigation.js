Template.navigation.events({
  'click .logout': function(event) {
    Meteor.logout();
    Router.go('main');
  }
})

Template.navigation.helpers({
    isMain: function() {
        var routeName = Router.current().route.getName();
        if (routeName === 'main' || routeName === "login" || routeName === "register" || routeName === "contact" || routeName === "messagesent") {
            return true;
        } else {
            return false;
        }
    }
})
