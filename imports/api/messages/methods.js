import { Meteor } from 'meteor/meteor';
import Messages from './messages.js';
import { check } from 'meteor/check';

Meteor.methods({
  'message.delete'(userId, messageId) {
    check(userId, String);
    check(messageId, String);

    const messageToDelete = Messages.findOne({ _id : messageId });

    if( typeof messageToDelete != 'undefined' && messageToDelete.userId === userId){
      Messages.remove({ _id : messageId });
    }
    else {
      throw new Meteor.Error('message.delete.unauthorized', 'Cannot delete messages that is not yours');
    }

  }
});
