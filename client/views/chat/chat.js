import Streamer from '/imports/stream.js'
var chatMessageCollection = new Meteor.Collection(null);
Template.chat.helpers({
  testing: function() {
    return chatMessageCollection.find();
  }
})
Template.chat.events({
  'submit form': function(event){
    event.preventDefault();
    var message = event.target.message.value;
    event.target.message.value = "";
    Streamer.emit('chat', message, Meteor.user().username);
  },
  'keypress textarea': function(event) {
    if(event.which === 13) {
      $("form[name='sendMessage']").submit();
    }
  }
})

Template.chat.onCreated(function() {

  chatMessageCollection.remove({})
  Streamer.on('chat', function(message, username) {
      chatMessageCollection.insert({message: message, username: username})
      var chat = document.getElementById("chatboard");
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  })
  Meteor.call("joinChat", Meteor.userId())
})

Template.chat.onDestroyed(function() {
  clearInterval(interval);
  Streamer.stop('chat')
  Meteor.call("leaveChat", Meteor.userId())

})
var interval = null;
Template.chat.onRendered(function() {
  interval = setInterval(function() {
  var chat = document.getElementById("chatboard");
  var isScrolledToBottom = chat.scrollHeight - chat.clientHeight <= chat.scrollTop;
  if(isScrolledToBottom)
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }, 500)
})
