import { Meteor } from 'meteor/meteor';
import Messages from '../../api/messages/messages.js';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  let users = [];
  if(Meteor.users.find().count() === 0) {
      users [0] = Accounts.createUser({email: 'benabed.mehdi@gmail.com', password: 'mehdi'});
      users [1] = Accounts.createUser({email: 'mehdi@mhidou.io', password: 'mehdi'});
  }
  if (Messages.find().count() === 0) {
    const data = [
      {
        'userId': users [0],
        'content': 'Hello',
        'createdAt': new Date()
      },
      {
        'userId': users [0],
        'content': 'Who is there?',
        'createdAt': new Date()
      },{
        'userId': users [1],
        'content': 'Me :p',
        'createdAt': new Date()
      },{
        'userId': users [0],
        'content': 'Hello Mhidou',
        'createdAt': new Date()
      },{
        'userId': users [1],
        'content': 'Hi bro!',
        'createdAt': new Date()
      },
    ];

    data.forEach((message) => {
      Messages.insert(message);
    });
  }
});
