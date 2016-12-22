import { Mongo } from 'meteor/mongo';

const Messages = new Mongo.Collection('messages');

Messages.allow({
  insert(userId, doc) {
    return doc.userId === userId;
  }
});

Messages.deny({
  remove(userId, doc) {
    return true;
  }
})

export default Messages;
