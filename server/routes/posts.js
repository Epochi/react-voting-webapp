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
  router.put('/:id',users.userAuthenticated, function(req, res, next) {
    console.log('votedPost running');
    votes.voteSwitch(req, res, next);
  });
  router.post('/post', users.userAuthenticated, posts.create);

  router.put('/post', function(req, res) {
    posts.update(req, res);
  });

  router.delete('/:id',users.userAuthenticated, function(req, res) {
    posts.remove(req, res);
  });
  
  router.get('/top/:page/.json', function(req,res,next){
    posts.top(req,res,next);
  });
  //get routes above this
  router.use(function(req,res,next){
    console.log('router use for posts');
    if(req.user){
      posts.match(req,res,next);
    } else{
      res.json(res.locals.posts);
    }
    
  });