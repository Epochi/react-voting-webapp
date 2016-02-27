/**
 * Routes for express app
 */
var topics = require('../controllers/topics');
var express = require('express');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var _ = require('lodash');
var Topic = mongoose.model('Topic');
var App = require('../../public/assets/app.server');

module.exports = function(app, passport) {
// user routes

  app.get('/auth/logout', users.logout);
  app.post('/auth/signup', users.create);
  
  app.post('/auth/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      console.log ('passport calling error');
      return next(err);
      }
    if (!user) {
      console.log(arguments);
      console.log ('passport calling no user error');
      return next(info);
      }
    req.logIn(user, function(err) {
      if (err) {
        console.log ('passport calling login error');
        return next(err); }
        console.log ('passport iz happi');
        console.log(user.name);
      return res.status(200).send({username: user.name});
    });
  })(req, res, next);
});
  /*
  app.post('/auth/users/session',
    passport.authenticate('local', {
      failureRedirect: '/ziegHail',
      failureFlash: 'Invalid email or password.'
    }), users.session);
    */
  app.get('/users/:userId', users.show);  
  //app.param('userId', users.load);
    

  // topic routes
  app.get('/topic', topics.all);

  app.post('/topic', function(req, res) {
    topics.add(req, res);
  });

  app.put('/topic', function(req, res) {
    topics.update(req, res);
  });

  app.delete('/topic', function(req, res) {
    topics.remove(req, res);
  });
  
  
  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  /*
  app.get('*', function (req, res, next) {
    App(req, res);
  });
  */
  //Catch all and user agent for css styling
  //more info at https://github.com/callemall/material-ui/pull/2172#issuecomment-157404901
    app.use(function(req, res, next) {
    GLOBAL.navigator = {
        userAgent: req.headers['user-agent']
       };
      next();
    });
    
    app.get('/', function (req, res, next) {
     App(req, res);
    });
  


  /**
   * Error handling
   */
   

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    
    console.log('ALL HAILEN ZIE ERROREN' + err);
    console.dir(err);
    console.dir("errorName: " + err.name);
    //console.dir(err.stack);
    console.log('HEIL ERROREN');
    

    if (err.stack.includes('ValidationError')) {
      if (err.errors.hasOwnProperty("hashed_password")){
        err.errors.hashed_password.value = '';
      }
      //console.error(err.stack);  
      res.status(422).send(err);
      return;
    } else if (err.stack.includes('passportLocalError')) {
      console.error(err.stack);  
      res.status(422).send(err);
      return;
    }
    

    // error page
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).send('Page Not Found')
  });
};;
