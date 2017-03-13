Template.registerHelper('isOnline', function(user) {
  var online = Meteor.users.findOne({_id: user._id, "status.online": true})
  if(online) {
    return true
  } else {
    return false;
  }
})

Template.forum.events({
  'click .createTopic': function() {
    Router.go('createTopic')
  }
})
Template.forum.helpers({
  topics: function() {
    return Topics.find().fetch();
  },
  postCount: function() {
    return this.posts.length;
  }
})


Template.createTopic.events({
  'submit form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var title = event.target.title.value;
    var message = event.target.message.value;
    Meteor.call('createTopic', user, title, message, function(error, result) {
      if(error) {
        console.log(error)
        Router.go('main');
      } else {
        Router.go('topic', {_id: result});
      }
    });
  }
})
Template.createTopic.onRendered(function() {
  $('.newTopic').validate({
    rules: {
      title: {
        required: true,
        maxlength: 50
      },
      message: {
        required: true,
        maxlength: 400
      }
    },
    errorPlacement: function(error, element) {
      element.attr("placeholder", error.text());
    }
  })
})

Template.topic.helpers({
  isAuthor: function() {
    if (Meteor.user() !== undefined) {
      // the user is ready
      if (Meteor.user()) {
        // the user is logged in
        if (Meteor.user()._id && Meteor.user().roles) {
          if(Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
            return true;
          } else {
            return this.author._id === Meteor.user()._id
          }
        }
      }
    }
    return false;
  },
  isTopicEdited: function() {
    var isEdited = Topics.findOne({_id: this._id, edited: {$exists: true}})
    if(isEdited) {
      return true
    } else {
      return false
    }
  },
  isPostEdited: function() {
    var isEdited = Topics.find({_id: Template.parentData()._id, posts: {$elemMatch: {_id: this._id, edited: {$exists: true}}}}).fetch();
    console.log("isEdited?")
console.log(isEdited.length);
    if(isEdited.length === 0) {
      return false
    } else {
      return true
    }
}
})

Template.topic.events({
  'click .deleteTopic': function() {
    Meteor.call('deleteTopic', this._id, function(error) {
      if(error) {
        console.log(error)
        Router.go('main')
      } else {
        Router.go('forum')
      }
    })
  },
  'click .editTopicButton': function(event) {

    $('.topic').children("p").addClass("hidden");
    $('.editTopicButton').addClass("hidden");
    $('.editTopicForm').removeClass("hidden");
  },
  'submit .editTopicForm': function(event) {
    event.preventDefault();
    var message= event.target.editMessage.value;
    Meteor.call('editTopic', this._id, message, function(error) {
      if(error) {
        console.log(error)
        Router.go('main');
      } else {
        console.log("success");
      }
    })
    $('.topic').children("p").removeClass("hidden");
    $('.editTopicButton').removeClass("hidden");
    $('.editTopicForm').addClass("hidden");
  },
  'click .deletePostButton': function() {
    Meteor.call('deletePost', Template.parentData()._id, this._id);
    Router.go('topic', {_id: Template.parentData()._id})
  },
  'click .editPostButton': function() {
    var target= $(event.target).parent().siblings('.media-body').children()
    target.children("p").addClass("hidden");
    target.children("form").removeClass("hidden");
    $(event.target).addClass("hidden");
    $(".newPost").addClass("hidden");
  },
  'submit .editPostForm':  function() {
    event.preventDefault();
    var message = event.target.editMessage.value;
    Meteor.call('editPost', Template.parentData()._id, this._id, message, function(error) {
      if(error ) {
        console.log("error");
        Router.go('main');
      }
    });
    $(event.target).siblings("p").removeClass("hidden");
    $(event.target).addClass("hidden");
    $(".editPostButton").removeClass("hidden");
    $('.newPost').removeClass("hidden");
  }
})

Template.createPost.events({
  'submit form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var message = event.target.post.value;
    event.target.post.value= "";
    Meteor.call('createPost', user, message, this._id);
  }
})

Template.createPost.onRendered(function () {
  $('.newPost').validate({
    rules: {
      post: {
        required: true
      }
    },
    errorPlacement: function(error, element) {
      element.attr("placeholder", error.text())
    }
  })
})

Template.topic.onRendered(function() {
  $('editTopicForm').validate({
    rules: {
      editMessage: {required: true}
    },
    errorPlacement: function(error, element) {
      element.attr("placeholder",error.text())
    }
  });
  $('editPostForm').validate({
    rules: {
      editMessage: {required: true}
    },
    errorPlacement: function(error, element) {
      element.attr("placeholder",error.text())
    }
  });
})
