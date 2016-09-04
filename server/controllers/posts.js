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
 

exports.load = function(req,res,next) {
  console.log('/api/post/ router Load');
  req.query.sort = Number(req.query.sort);
  req.query.page = Number(req.query.page - 1);
  console.log(req.query);
  var LoadPromises = [[]];
  
  
  if(req.query.hasOwnProperty('post')){
  LoadPromises.push(
    Post.postLoadSingle({post_id: Number(req.query.post)})
    );
  }
  
  if(req.params.subport === "visi"){
  LoadPromises.push(
    Post.postsLoadAll({sort: req.query.sort, page: req.query.page, subport: req.params.subport, user: req.user})
    );
  }
  console.log("load promises with param");

  Promise.all(LoadPromises)
    .then(result => {
      console.dir(result);
      return res.json(result.reduce(function(a, b) {
        return a.concat(b)})
      );
    })
    .catch(err => {return next(err)});
  
  /*.reduce(function(a, b) {
  return a.concat(b)})
  console.log(Number.isInteger(req.params.sort));
  Post.postsLoad({sort: Number(req.query.sort), page: Number(req.query.page -1), subport: req.params.subport, user: req.user}, function(err, posts){
    if(err){return next(err)}
    console.log('responding with posts');
    return res.json(posts);
  });*/
}; 

exports.loadPostSingle = function(req,res,next){
  Post.postLoadSingle({post_id: Number(req.params.postid), user: req.user}, function(err, post){
    if(err){return next(err)}
    console.log('responding with single post');
    return res.json(post);
  });
}; 


/**
 * Load All
 */
 /*
function loadAll(sort,page,user){
    Post.postsLoad({sort: req.query.sort, page: Number(req.query.page -1), subport: req.params.subport, user: req.user}, function(err, posts){
      if(err){return err}
      console.log('responding with posts');
    return posts;
  });
}
*/


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
      //author: req.user.name,
      author: "eminem2008",
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
