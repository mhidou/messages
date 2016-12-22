import { Meteor } from 'meteor/meteor';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Accounts } from 'meteor/accounts-base'
import StubCollections from 'meteor/hwillson:stub-collections';
import Messages from './messages.js';
import './methods.js';

Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

Meteor.methods({
  'users.create'(email, password) {
    return Accounts.createUser({email: email, password: password})
  },
});

if(Meteor.isClient) {
  describe('Messages collection', function () {
    beforeEach(function (done) {
      Meteor.call('test.resetDatabase', done);
    });

    it('Insert without explicit server side call', function (done) {
      Meteor.call('users.create', 'test@test.test', 'test', function (err, myUserId) {
        Meteor.loginWithPassword('test@test.test', 'test', function(err){
          expect(err).to.be.a('undefined');
          const message = Messages.insert({userId: myUserId, content: 'Hello test'},
            function(err, id){
              expect(err).to.be.a('undefined');
              expect(id).to.be.a('string');
              done();
            });
        })
      });
    });

    it('Delete using a server side call', function (done) {

      Meteor.call('users.create', 'test@test.test', 'test', function (err, myUserId) {
        Meteor.loginWithPassword('test@test.test', 'test', function(err){
          expect(err).to.be.a('undefined');

          const message = Messages.insert({ userId: myUserId, content: 'Hello test1', createdAt: new Date() }, function (err, id) {
            Meteor.call('message.delete', myUserId, message , function(err, id){
              expect(err).to.be.a('undefined');
              expect(id).to.be.a('undefined');
              done();
            });
          });
        })
      });


    })


    it('Cannot delete using a client side call', function (done) {
      const userId = Random.id();
      const message = Messages.insert({ userId: userId, content: 'Hello test1', createdAt: new Date() });

      Messages.remove({_id: message} , function(err, id){
        expect(err).to.be.a('object');
        expect(id).to.equal(false);
        done();
      });
    })

    it("Cannot delete another user's message", function (done) {
      const userId = Random.id();
      const message = Messages.insert({ userId: userId, content: 'Hello test1', createdAt: new Date() });

      Meteor.call('message.delete', Random.id(), message , function(err, id){
        expect(err).to.be.a('object');
        expect(id).to.be.a('undefined');
        done();
      });
    })
  });
}
