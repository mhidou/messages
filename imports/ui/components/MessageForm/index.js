import Messages from '/imports/api/messages/messages.js';

import './MessageForm.html';

Template.MessageForm.events({
  'submit #MessageForm': function (e){
    e.preventDefault();

    //Without an explicit server side call
    Messages.insert({
      userId: Meteor.userId(),
      content: e.target.messageContent.value,
      createdAt: new Date()
    });

    e.target.messageContent.value = '';
  }
})
