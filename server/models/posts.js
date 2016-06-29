var utils = require('../config/utils');
var db = require('../config/postgres');
var box = {0: {type: 'top', order: 'voteup' },1: {type: 'all', order: 'score'},2:{type:'new', order: 'date' }};





exports.postsLoad = function(data, cb){
   var query = {
     name: "post_"+box[data.type].type,
     text: "select * from post ORDER BY "+box[data.type].order+" DESC LIMIT 20 OFFSET ($1 * 20)",
     values: [data.page]
   };
   if(data.user != null){
     query.text ="SELECT * FROM (" +query.text + ") q LEFT JOIN post_vote ON q.post_id = post_vote.post_id  AND post_vote.username = '"+data.user.username+"'";
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