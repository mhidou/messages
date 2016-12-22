import Messages from '/imports/api/messages/messages.js'

import './MessagesList.html';

import '../Message'
import '../MessageForm'

Template.MessagesList.onCreated(function MessagesListOnCreated() {
  Meteor.subscribe('messages.all');
});

Template.MessagesList.helpers({
  messages(){
    return Messages.find({}, {sort: {createdAt: 1}});
  }
})
