/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

/**
 * Expose
 */


module.exports = new LocalStrategy({
    username: 'email',
    password: 'password'
  },
  function (email, password, done) {
    console.log('LocalStrategy RAPART ZIEG HAIL: ' + arguments);
    console.dir(arguments);
    const options = {
      criteria: (email.indexOf('@') === -1) ? {username: email} : {email: email},
      select: 'name username email hashed_password salt'
    };
    User.load(options, function (err, user) { if (err) return done(err);
    console.log('Inside local strategy atm');
      if (!user) {
        return done(null, false, {stack: 'passportLocalError', errors: { username: {path: "username", message: "Vartotojas nerastas" } }  });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {stack: 'passportLocalError', errors: { password: {path: "password", message: "Neteisingas slaptažodis" } }  });
      }
      return done(null, user);
    });
  }
);

//  var criteria = (email.indexOf('@') === -1) ? {username: username} : {email: username};
//                 (email.indexOf('@') === -1) ? {username: email} : {email: email};