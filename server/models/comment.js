var utils = require('../config/utils');
var guest = require('../config/postgres').guest;
var sort = ['score', 'vote_up', 'date'];

var sql = require('../sql/sql.js').posts; // our sql for users;

exports.loadComments = function(postId){
    return guest.manyOrNone(sql.commentLoadAll, {post_id: postId})
        .then (result => {
                console.log('comment/postId RETURN');
                //console.log(result);
                console.log('c/postId Succesfully returned AFTER RESULT');
                // used to be result.comments
            return result;
        })
        .catch(error => {console.log('p/subport/ error');console.log(error);return error});
}


exports.create = function(data,cb){
    console.log('inside models/comment/create');
    commentSequence(data.post_id,function(err, sequence){
    if(err) console.log('Comment Sequence Error');
        db.db.any({
            name: "comment_create",
            text: "INSERT INTO comment (parent_id, comment_id, data) VALUES ($1, $2, $3) RETURNING *", // can also be a QueryFile object
            values: [data.parent_id, data.sequence, data.data]
          }).then(result => {
          console.log('comment create result');
          console.log(result);
          return cb(null,result);
        })
    .catch(error => {return cb(error)});
    })
}



exports.loadOne = function (data ,cb){
    console.log('inside comment/load');
    console.log(data);
    guest.one(sql.commentLoadSingle)
          .then(result => {
              console.log('load result');
              console.log(result);
              return cb(null, result);
            })
            .catch(error => {return cb(error)});
};


exports.loadAll = function (parent ,cb){
    console.log('inside comment/loadall');
    console.log(parent ,cb);
        db.db.many({
            name: "comment_load_all",
            text: "SELECT * FROM comment WHERE parent_id = $1 RETURNING *",
            values: [parent]
          }).then(result => {
          console.log('comment done sequence');
          console.log(result);
          return cb(null,result);
        })
    .catch(error => {return cb(error)});
}



function commentSequence(post,cb){
        db.db.one({
            name: "post_commentsequence",
            text: "UPDATE post SET commentcount = commentcount+1 WHERE post_id = $1 RETURNING commentcount",
            values: [post]
          }).then(result => {
          console.log('comment done sequence');
          console.log(result);
          return cb(null,result);
        })
    .catch(error => {return cb(error)});
}