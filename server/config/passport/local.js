/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */
//var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

/**
 * Expose
 */


module.exports = new LocalStrategy({
    username: "email",
    password: "password"
  },
  function (email, password, done) {
    console.log('LocalStrategy RAPART ZIEG HAIL: ' + arguments);
    console.dir(arguments);
    const options = {
      criteria: (email.indexOf('@') === -1) ? "username" : "email",
      select: email,
      password: password
    };
    User.loadLocal(options, function (err, username) {
    if (err) return done(err, false);
    console.log('Inside local strategy atm');
      User.load(username, function (err, user){
        if (err) return done(err);  
        return done(null, user);
      })
    });
  }
);

//  var criteria = (email.indexOf('@') === -1) ? {username: username} : {email: username};
//                 (email.indexOf('@') === -1) ? {username: email} : {email: email};