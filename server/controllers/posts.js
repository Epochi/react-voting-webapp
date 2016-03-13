var mongoose = require('mongoose');
var _ = require('lodash');
var Post = mongoose.model('Post');
var votes = require('../controllers/votes');


/**
 * List
 */
exports.top = function(req,res,next) {
  var user = req.user ? req.user._id : false;
  //console.log(req.user);
  console.log('CLUser');
  console.log(req.session)
  console.log(user);
  Post.top(user,0, function(err, posts){
    if(err){return next(err)}
    console.log('responding with posts');
    /*console.dir(posts[0])
    console.dir(posts[1])
    console.dir(posts[2])*/
    res.json(posts);
    
  });
  /*
  Post.find({}).sort({score:-1}).limit(20).exec(function(err, posts){
    if(err){return console.log('Error in first query')}
    console.log('responding with posts');
    //console.log(posts);
    res.json(posts);
  });
  */
}; 


exports.all = function(req, res) {
  Post.find({}).exec(function(err, posts) {
    if(!err) {
      res.json(posts);
    }else {
      console.log('Error in first query');
    }
  });
};

/**
 * Add a Post
 */
exports.create = function(req, res, next) {
  console.log('creation start');
  var subport = req.body.funny ? "linksmi" : "idomus"; 
  if(req.body.type === 0){
  var post = new Post({
      kind: req.body.type,
      data: {
          tags: req.body.tags,
          subport: subport,
          title: req.body.title,
          bodytext: req.body.text,
          author: req.user.name,
          url: req.body.url
      }
  });
  console.dir(post);
  }
  post.save(function (err, post, state){
      if(err){
          return next(err);
      }
      votes.voteOnCreation(post._id, req.user._id,next);
      console.log("success");
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
  var query = { id: req.body.id };
  Post.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    res.status(200).send('Removed Successfully');
  });
};