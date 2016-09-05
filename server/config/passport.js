/* Initializing passport.js */
//var User = require('../models/user');
//var mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
//var User = mongoose.model('User');
//var UserThing = mongoose.model('UserThing');
var local = require('./passport/local');
var user = require('../models/user');
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
    console.log('serializeUser ' + user)
    console.dir(user);
    done(null, user.username)
  })

  passport.deserializeUser(function(username, done) {
    user.load(username, function (err, user) {
      console.log('deserializeUser ' + user);
      done(err,user);
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

