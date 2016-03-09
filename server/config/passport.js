/* Initializing passport.js */
//var User = require('../models/user');
var mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var UserThing = mongoose.model('UserThing');
var local = require('./passport/local');
/*
var google = require('./passport/google');
var facebook = require('./passport/facebook');
var twitter = require('./passport/twitter');
var linkedin = require('./passport/linkedin');
var github = require('./passport/github');
*/

/**
 * Expose
 */

module.exports = function (app, passport, config) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log('serializing user')
    var sessionUser = { _id: user._id, name: user.name, votes: user.votes }
    done(null, sessionUser)
  })

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id }, select: 'name' }, function (err, user) {
      console.log('desiarizing user: '+user);
      var username = user.name.toLowerCase();
      UserThing.load({criteria: {username: username}, select: 'postVotes'}, function(err,userThing){
        console.log(userThing.postVotes);
        var sessionUser = {_id: user._id, name: user.name, votes: userThing.postVotes};
        console.log(sessionUser);
        done(err,sessionUser);
      });
    });
  });

  // use these strategies
  passport.use(local);
  /*
  passport.use(google);
  passport.use(facebook);
  passport.use(twitter);
  passport.use(linkedin);
  passport.use(github);
  */
};

