Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template: 'main',
  name: 'main'
})

Router.route('/register', {
  template: 'register',
  name: 'register'
})
Router.route('/login', {
  template: 'login',
  name: 'login'
})
Router.route('/contact', {
  template: 'contact',
  name: 'contact'
})
Router.route('/sent', {
  template: 'messagesent',
  name: 'messagesent'
})
Router.route('/account', {
  template: 'account',
  name: 'account',
  onBeforeAction: function() {
    if(Meteor.user()) {
      this.next();
    } else {
      this.render('login');
    }
  }})
Router.route('/forum', {
  template: 'forum',
  name: 'forum',
  subscriptions: function() {
    return Meteor.subscribe('topics');
  }
})
Router.route('/createTopic', {
  template: 'createTopic',
  name: 'createTopic',
  onBeforeAction: function() {
    if(Meteor.user()) {
      this.next();
    } else {
      this.render('login');
    }
  }
})

Router.route('/topic/:_id', {
  name: 'topic',
  template: 'topic',
  onBeforeAction: function() {
    Meteor.call('updateViewCount', this.params._id);
    this.next();
  },
  data: function() {
    return Topics.findOne({})
  },
  subscriptions: function() {
    return [Meteor.subscribe('topic', this.params._id), Meteor.subscribe('users')]
  }
})
Router.route('/chat', {
  template: 'chat',
  name: 'chat',
  onBeforeAction: function() {
    if(Meteor.user()) {
      this.next();
    } else {
      this.render('login');
    }
  },
  data: function(){
    return {
        onlineUsers : Meteor.users.find({}),
      }
  },
  subscriptions: function() {
    var date = new Date();
    return [Meteor.subscribe('onlineUsers')]
  }
})
