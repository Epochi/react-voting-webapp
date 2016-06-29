var utils = require('../config/utils');
var db = require('../config/postgres');
var qrm = db.pgp.queryResult;


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
    db.db.oneOrNone({name: "comment_load_one",
    text: 'SELECT * FROM comment WHERE comment_id = $1 LIMIT 1',
    values: [data]})
          .then(result => {
              console.log('load result');
              console.log(result);
              return cb(null, result );
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