var utils = require('../config/utils');
var db = require('../config/postgres');
var qrm = db.pgp.queryResult;


exports.createPostVote = function(data, cb){
  db.db.none({
        name: "vote_post_create",
        text: "INSERT INTO post_vote (username, post_id, post_vote) VALUES ($1, $2, $3);",
        values: [data.username, data.post_id, data.post_vote]
      }).then(result => {
      console.log('create result');
      return cb();
    })
    .catch(error => {return cb(error)});
};


exports.updatePostVote = function(data, cb){
  db.db.one({
        name: "vote_post_update",
        text: "UPDATE post_vote SET post_vote = $3 WHERE post_id = $2 AND username = $1;",
        values: [data.username, data.post_id, data.post_vote]
      }).then(result => {
      console.log('update post vote result');
      console.log(result);
      return cb();
    })
    .catch(error => {return cb(error)});
};