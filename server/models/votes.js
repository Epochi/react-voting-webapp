var utils = require('../config/utils');
var user = require('../config/postgres').user;
var sql = require('../sql/sql.js').votes; 



exports.createPostVote = function(data, cb){
  user.none({
        name: "vote_post_create",
        text: "INSERT INTO post_vote (username, post_id, post_vote) VALUES ($1, $2, $3);",
        values: [data.username, data.post_id, data.post_vote]
      }).then(result => {
      console.log('create result');
      return cb();
    })
    .catch(error => {return cb(error)});
};


//creates vote item
exports.votePost = function(data, cb){
  user.one(sql.onPost,data).then(result => {
      console.log('update post vote result');
      console.log(result);
      return cb(null, result);
    })
    .catch(error => {return cb(error)});
};

//updates post vote_up count
exports.postVoteCountUpdate = function(data,cb){
    user.none(sql.postVoteCountUpdate,{post: data.post, operator: data.operator ? 1 : -1}).then(result => {
      console.log('post vote_up update');
      console.log(result);
      return cb(null, result);
    })
    .catch(error => {return cb(error)});
};