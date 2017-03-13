Template.account.events({
  'click .editAccount' : function(event) {
    event.preventDefault();
    $('.editForm').removeClass("hidden");
    $('.userinfo').addClass("hidden");
  },
  'click .saveEdit' : function(event) {
    event.preventDefault();
    $('.editForm').addClass("hidden");
    $('.userinfo').removeClass("hidden");
    var inputname = $('#inputname').val();
    var inputemail = $('#inputemail').val();
    var inputsex = $('#inputsex').val();
    var inputage = $('#inputage').val();
    var inputcountry = $('#inputcountry').val();
    var userId = Meteor.user()._id;

    Meteor.call('updateUserProfile', userId, inputname, inputemail, inputsex, inputage, inputcountry);
    Router.go('account');
    console.log(inputname + "|" + inputemail + "|" + inputsex + "|" + inputage);
    console.log(userId + "-------------");
  },
  'click .cancelEdit' : function(event) {
    event.preventDefault();
    $('.editForm').addClass("hidden");
    $('.userinfo').removeClass("hidden");
    Router.go('account');
  }
})

Template.account.helpers({

});
