/* Initializing passport.js */
//var User = require('../models/user');
var mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

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

module.exports = function (passport) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    var sessionUser = { _id: user._id, name: user.name }
    done(null, sessionUser)
  })

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id }, select: 'name' }, function (err, user) {
      console.log('desiarizing user');
      done(err, user)
    })
  })

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

