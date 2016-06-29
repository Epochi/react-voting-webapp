var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

module.exports = function(passport){

  router.post('/logout', users.logout);
  router.post('/signup', users.createLocal);
  router.post('/login', function(req, res, next) {
            passport.authenticate('local', function(err, user, info) {
              if (err) {
                console.log('passport calling error');
                return next(err);
              }
              if (!user) {
                console.log(arguments);
                console.log('passport calling no user error');
                return next(info);
              }
              req.logIn(user, function(err) {
                if (err) {
                  console.log('passport calling login error');
                  return next(err);
                }
                console.log('passport iz hrouteri');
                console.log(user);
                console.log(user.name);
                return res.status(200).json({
                  username: user.name
                });
              });
            })(req, res, next);
          });
          
        return router;
} 
  
