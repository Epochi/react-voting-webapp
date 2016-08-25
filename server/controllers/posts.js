//var mongoose = require('mongoose');
var _ = require('lodash');
//var Post = mongoose.model('Post');
//var PostThing = mongoose.model('PostThing');
var votes = require('../controllers/votes');
//var Vote = mongoose.model('Vote');
var Post = require('../models/posts');

/**
 * List
 */
 
//'/:port/:page/:sort/.json'
exports.load = function(req,res,next) {
  console.log('CLUser exports.top');
  console.log(req.params.sort);
  console.log(Number.isInteger(req.params.sort));
  //var loadParams = {};
    

  
  Post.postsLoad({type: Number(req.params.sort), page: Number(req.params.page), port: req.params.port, user: req.user}, function(err, posts){
    if(err){return next(err)}
    console.log('responding with posts');
    return res.json(posts);
  });
}; 


/**
 * Add a Post
 */


exports.create = function(req, res, next) {
  console.log('creation start');
  /*if(!req.isAuthenticated()){
          return next({message: "Not authenticated"});
  }*/
  if(req.body.type === 0){
  var post = {
      kind: req.body.type,
      tags: req.body.tags,
      subport: req.body.subport,
      title: req.body.title,
      author: req.user.name,
      data: req.body.data
    };
  }
  
  Post.create(post,function(err,post){
     if(err){return next(err);}
      console.log('inside Post.create')
     return res.status(200).json(post);
  });
  
};

/**
 * Update a post
 */
exports.update = function(req, res) {
  var query = { id: req.body.id };
  var isIncrement = req.body.isIncrement;
  var isFull = req.body.isFull;
  var omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  var data = _.omit(req.body, omitKeys);

  if(isFull) {
    Post.findOneAndUpdate(query, data, function(err, data) {
      if(err) {
        console.log('Error on save!');
        res.status(500).send('We failed to save to due some reason');
      }
      res.status(200).send('Updated successfully');
    });
  } else {
    Post.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1: -1 } }, function(err, data) {
      if(err) {
        console.log('Error on save!');
        // Not sure if server status is the correct status to return
        res.status(500).send('We failed to save to due some reason');
      }
      res.status(200).send('Updated successfully');
    });
  }
  
};

/**
 * 
 */

/**
 * Remove a post
 */
exports.remove = function(req, res) {
  console.log(`id: ${req.params.id} and username: ${req.user.name}`)
  var query = { _id: req.params.id, 'data.author' :req.user.name };
  Post.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    if(data){
      PostThing.remove({_id: req.params.id},function(err,post){
      if(err) console.log('Error on delete');
      if(post){return res.status(200).send('Removed Successfully');}  
      return res.status(400).send('PostThing not found');
      })}
      else {return res.status(400).send('Nerasta');}
    
    
  });
};
