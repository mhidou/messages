import '../../api/messages/methods.js';
import '../../api/messages/server/publications.js';

Meteor.publish("allusers",
  function () {
    return Meteor.users.find({});
  }
);
