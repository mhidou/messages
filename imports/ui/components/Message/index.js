import Messages from '/imports/api/messages/messages.js'
import './Message.html';

Template.Message.onCreated(function MessageOnCreated() {
  Meteor.subscribe('allusers');
});

Template.Message.helpers({
  myMessage() {
    return Meteor.userId() === this.userId;
  }
})

Template.Message.events({
  'click .delete'() {
    Meteor.call('message.delete', Meteor.userId(), this._id);
  },
})
