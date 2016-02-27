var mongoose = require('mongoose');
var wrap = require('co-express');
var User = mongoose.model('User');

/**
 * Load
 */

exports.load = wrap(function* (req, res, next, _id) {
  console.log('muh name  is controller load');
  var criteria = { _id };
  req.profile = yield User.load({ criteria });
  if (!req.profile) return next(new Error('User not found'));
  next();
});

/**
 * Create user
 */

exports.create = wrap(function* (req, res, next) {
  /*if(req.body.password !== req.body.passwordConfirmation){
   next({stack: 'ValidationError', errors: { passwordConfirmation: {path: "passwordConfirmation", message: "Slaptažodžiai turi būti vienodi" }, hashed_password: {path: "hashed_password", message: "Slaptažodžiai turi būti vienodi"} }  }) ;
  }
  */
   var user =  new User({
    name: req.body.username,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  
  user.provider = 'local';
  user.setPassword(req.body.password, req.body.passwordConfirmation);
  yield user.save();
    req.logIn(user, function(err) {
      if (err) {
        console.log ('passport SignUp > login error');
        return next(err); }
        console.log ('passport iz happi inside login creator');
      return res.status(200).send({message: "Successful authentication"});
    });
});

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile;
  res.render('/auth/users/show', {
    title: user.name,
    user: user
  });
};

/*
exports.signin = function () {};
*/
/**
 * Auth callback
 */

exports.authCallback = login;

/**
 * Show login form
 

exports.login = function (req, res) {
  res.render('/auth/users/login', {
    title: 'Login'
  });
};

*/

/**
 * Show sign up form


exports.signup = function (req, res) {
  res.render('/auth/users/signup', {
    title: 'Sign up',
    user: new User()
  });
};
*/
/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logOut();
  return res.status(302).redirect('/');
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  console.log("DAS IST THE SUCCES LOGINZER FUNCTION");
  res.status(200).send("Authenticated");
}