var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var posts = require('../controllers/posts');
var votes = require('../controllers/votes');

module.exports = router;
/*
    router.param(['subport','page', 'id','title'], function (req, res, next, value) {
        console.log("ROUter.PARAM CAN SEE: " + value);
    next();
    });
    */
  router.put('/vote',users.userAuthenticated, function(req, res, next) {
    console.log('/vote express');
    votes.voteSwitch(req, res, next);
  });
  router.post('/post', users.userAuthenticated, posts.create);
  

  
  router.put('/post', function(req, res) {
    posts.update(req, res);
  });

  router.delete('/:id',users.userAuthenticated, function(req, res) {
    posts.remove(req, res);
  });
  
  router.get('/post/:postid/.json', function(req,res,next){
    posts.loadPostSingle(req,res,next);
  });
  
  router.get('/:subport/:page/:sort/.json', function(req,res,next){
    posts.load(req,res,next);
  });