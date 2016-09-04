/**
 * Routes for express app
 */
var express = require('express');
var auth = require('../routes/auth');
var posts = require('../routes/posts');
var users = require('../controllers/users');
var poster = require('../controllers/poster');
//var mongoose = require('mongoose');
var path = require('path');
var compiled_app_module_path = path.resolve(__dirname, '../../', 'public', 'assets', 'server.js');
var App = require(compiled_app_module_path);


module.exports = function(app, passport) {
  app.use('*', function(req,res,next){
    console.log('URL HUNTER FROM ROUTES.js.....:' + req.originalUrl);
    next();
  })
  app.use('/auth', auth(passport));
  app.use('/api/post', posts);
  
  app.get('/poster', poster.fetchReddit);
  app.get('/u/:userId', users.show);
  
  app.get('*', function (req, res, next) {
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
    } else if(err.message === 'No data returned from the query.'){
      res.status(422).send({err: {message: 'Nieko nerasta'}});
    }


    // error page
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).send('Page Not Found')
  });
};
