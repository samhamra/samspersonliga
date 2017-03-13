Meteor.publish('topics', function() {
  return Topics.find();
});
Meteor.publish('topic', function(currentTopic) {
  return Topics.find({_id: currentTopic});
})
Meteor.publish('onlineUsers', function() {
  return Meteor.users.find({"status.online": true, "route": "chat"}, {fields: {_id: 1, username: 1}})
})
Meteor.publish('users', function() {
  return Meteor.users.find({}) //fields??
})
