var utils = require('../config/utils');
var db = require('../config/postgres');
var box = {0: {type: 'hot', order: 'score' },1: {type: 'top', order: 'voteup'},2:{type:'new', order: 'date' }};





exports.postsLoad = function(data, cb){
   var query = {
     name: "post_"+box[data.type].type,
     text: "select * from post ORDER BY "+box[data.type].order+" DESC LIMIT 5 OFFSET ($1 * 15)",
     values: [data.page]
   };
   if(data.user != null){
     query.text ="SELECT q.*, j.* FROM (" +query.text + ") q LEFT JOIN votes j ON q.post_id = j.post_id  AND j.username = '"+data.user.username+"' ORDER BY q."+box[data.type].order+" DESC";
   }
    console.log('inside models/post/top');
      db.db.manyOrNone(query)
        .then(result => {
          console.log('post/top result');
          console.log(result);
          return cb(null,result);
        })
        .catch(error => {console.log('post/top error');console.log(error);return cb(error)});
};




exports.create = function(data,cb){
     console.log('inside models/post/create');
   //text: "INSERT INTO user_data (username, name, email) VALUES ($1, $2, $3) RETURNING username", // can also be a QueryFile object
  db.db.any({
        name: "post_create",
        text: "INSERT INTO post (kind, author, title, subport,tags, data) VALUES ($1, $2, $3, $4, ARRAY[$5], $6) RETURNING *", // can also be a QueryFile object
        values: [data.kind, data.author, data.title, data.subport, data.tags, JSON.stringify(data.data)]
      }).then(result => {
      console.log('create result');
      console.log(result);
      return cb(null,result);
    })
    .catch(error => {return cb(error)});
}

exports.postVote = function(data, cb){
    
      db.db.none({
        name: "post_score_update",
        text: "UPDATE post SET "+data.vote+" = "+data.vote+"+1 WHERE post_id = $1;",
        values: [data.post_id]
      }).then(result => {
      console.log('post score update');
      return cb();
    })
    .catch(error => {return cb(error)});
    
}