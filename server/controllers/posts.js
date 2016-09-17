var _ = require('lodash');
var Post = require('../models/posts');
var PostAuth = require('../models/postsauth');
var Comments = require('../models/comment');
/**
 * List
 */
 
/*
Promise nesting can be more elegant, like using closures.
Pushing Promise.all into Promise.all array and returining {comments: data}
so it wouldn't need to evaluate 'comments ? null' each time it doesn't load specific post
Then again, this is only used on the initial load, so it's not that important
*/

//I think models are redundant. Mongoose models are the same as Postgres pg-promise /sql/ folder
//They're just a leftover from mongoose to postgresql migration
//Should remove them in the future
exports.load = function(req,res,next) {
  console.log('/api/post/ router Load');
  req.query.sort = Number(req.query.sort);
  req.query.page = Number(req.query.page);
  console.log(req.query);
  //nesting indexes because comments will have to have different object, but go out on the same
  var postsPromises = [];
  var commentsPromises = [];
  
  
  if(req.query.hasOwnProperty('post')){
  postsPromises.push(
    Post.postLoadSingle({post_id: Number(req.query.post)})
    );
  }
  
  if(req.params.subport === "visi"){
  postsPromises.push(
    Post.postsLoadAll({sort: req.query.sort, page: req.query.page, subport: req.params.subport, user: req.user})
    );
  }
  console.log("load promises with param");


  

  Promise.all([Promise.all(postsPromises).then(result => {
    return result.reduce(function(a, b) {
        return a.concat(b)});
  }).catch(err => {return next(err)})
    ,
   Promise.all(commentsPromises).then(result => {
    if(result === undefined){
      return null
    }else {
    return result;
    }
  }).catch(err => {return next(err)}) 
    ])
    .then(result => {
      console.log("promises top nest with param");
      console.log(result);
      console.log("result arr end");
      return res.json({posts:result[0],comments: result[1] });
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
  PostAuth.create(post,function(err,post){
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






/****/
/*For Logged In;*/
/***/

exports.loadUser = function(req,res,next) {
  console.log('/api/post/ router LoadAuthenticated');
  req.query.sort = Number(req.query.sort);
  req.query.page = Number(req.query.page);
  console.log(req.query);
  console.log(req.user);
  var postsPromises = [];
  var commentsPromises = [];
  
  //im pushing function call to promise array
  //PostAuth returns it's functions as promises. result can be modified there
  if(req.query.hasOwnProperty('post')){
    postsPromises.push(
      PostAuth.postLoadSingle({post_id: Number(req.query.post), username: req.user.username})
      )
  }
  
  if(req.params.subport === "visi"){
    postsPromises.push(
      PostAuth.postsLoadAll({sort: req.query.sort, page: req.query.page, subport: req.params.subport, username: req.user.username})
    )
  }
  console.log("load promises with param");
  
  Promise.all([Promise.all(postsPromises).then(result => {
    return result.reduce(function(a, b) {
        return a.concat(b)});
  }).catch(err => {return next(err)})
    ,
   Promise.all(commentsPromises).then(result => {
    if(result === undefined){
      return null
    }else {
    return result;
    }
  }).catch(err => {return next(err)}) 
    ])
    .then(result => {
      console.log("promises top nest with param");
      console.log(result);
      console.log("result arr end");
      return res.json({posts:result[0],comments: result[1] });
    })
    .catch(err => {return next(err)});
}; 





exports.commentCreate =function(req,res,next){
console.log('creation start');

  if(req.body.type === 1){
  var comment = {
      parent_id: req.body.comment.parent_id,
      author: req.user.username,
      post_id: req.body.comment.post_id,
      path: req.body.comment.parent_path,
      data: req.body.comment.data
    };
  }
  
  PostAuth.createComment(comment,function(err,post){
     if(err){return next(err);}
      console.log('inside Post.create')
     return res.status(200).json(post);
  });
  
}

exports.loadComments = function(req,res,next){
  Promise.resolve([loadCommentsModelHelper(Number(req.params.post_id))])
    .then(result => {
      console.log("loadComments controller results");
      console.log(result);
      console.log("loadComments controller results end");
      return res.json({comments: result});
    })
    .catch(err => {return next(err)});
};

function loadCommentsModelHelper(postId){
  Comments.loadComments(postId);
}