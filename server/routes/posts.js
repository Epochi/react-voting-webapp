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
  router.put('/vote/:post',users.userAuthenticated, function(req, res, next) {
    console.log('/vote express');
    votes.voteSwitch(req, res, next);
  });
  router.post('/create', users.userAuthenticated, posts.create);
  

  
  router.put('/update', function(req, res) {
    posts.update(req, res);
  });

  router.delete('/delete/:post_id',users.userAuthenticated, function(req, res) {
    posts.remove(req, res);
  });
/*  
  router.get('/post/:postid/.json', function(req,res,next){
    posts.loadPostSingle(req,res,next);
  });
*/
  router.get('/:subport', function(req,res,next){
    if(req.isAuthenticated()){
    posts.loadUser(req,res,next);
    }else{
    posts.load(req,res,next);
    }
  });