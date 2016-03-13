/**
 * Routes for express app
 */
var express = require('express');
var users = require('../controllers/users');
var posts = require('../controllers/posts');
var poster = require('../controllers/poster');
var votes = require('../controllers/votes');
var mongoose = require('mongoose');
var _ = require('lodash');
var Post = mongoose.model('Post');
var path = require('path');
var compiled_app_module_path = path.resolve(__dirname, '../../', 'public', 'assets', 'server.js');
var App = require(compiled_app_module_path);


module.exports = function(app, passport) {
  // user routes

  app.post('/auth/logout', users.logout);
  app.post('/auth/signup', users.create);
  app.post('/auth/login', function(req, res, next) {
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
        console.log('passport iz happi');
        console.log(user.name);
        return res.status(200).json({
          username: user.name
        });
      });
    })(req, res, next);
  });

  app.get('/users/:userId', users.show);
  //app.param('userId', users.load);
  app.param(['subport', 'id','title'], function (req, res, next, value) {
    console.log("APP.PARAM CAN SEE: " + value);
  next();
    });
  
  
  // post routes
  app.get('/poster', poster.fetchReddit);
  app.post('/poster', poster.fetchReddit);

  app.get('/top', function(req,res,next){
    console.log("originam url");
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    posts.top(req,res,next);
  });
  

  app.put('/p/:subport/:id/:title',users.userAuthenticated, function(req, res, next) {
    console.log('votedPost running');
    votes.votedPost(req, res, next);
  });
  app.post('/post', users.userAuthenticated, posts.create);

  app.put('/post', function(req, res) {
    posts.update(req, res);
  });

  app.delete('/post', function(req, res) {
    posts.remove(req, res);
  });

  app.get('*', function (req, res, next) {
    console.log('CATCH ALL SESS');
    console.log(req.session);
        console.log("originam url");
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    App.default(req, res);
  });


  /**
   * Error handling
   */


  app.use(function(err, req, res, next) {
    // treat as 404
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.log('ALL HAILEN ZIE ERROREN' + err);
    console.dir(err);
    console.dir("errorName: " + err.name);
    //console.log("ERROR STACK______________________________");
    //console.dir(err.stack);
    console.log('HEIL ERROREN');


    if (err.stack.includes('ValidationError')) {
      if (err.errors.hasOwnProperty("hashed_password")) {
        err.errors.hashed_password.value = '';
      }
      //console.error(err.stack);  
      res.status(422).send(err);
      return;
    }
    else if (err.stack.includes('passportLocalError')) {
      console.error(err.stack);
      res.status(422).send(err);
      return;
    }


    // error page
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).send('Page Not Found')
  });
};;
