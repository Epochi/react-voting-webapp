var utils = require('../config/utils');
var guest = require('../config/postgres').guest;
var sort = ['score', 'vote_up', 'date'];

var sql = require('../sql/sql.js').posts; // our sql for users;



exports.postsLoadAll = function(data){
    return guest.many(sql.loadAll, {sort: sort[data.sort],page: data.page});
};

exports.postsLoad = function(data, cb){
    // sort hot top date
    if(data.subport === 'all'){
        guest.many(sql.loadAll, {sort: sort[data.sort],page: data.page})
            .then(result => {
                console.log('p/all Succesfully returnred');
                //console.log(result);
                return cb(null,result);
            })
            .catch(error => {console.log('p/all/ error');console.log(error);return cb(error)});
    }else{
        guest.many(sql.loadCategory,{sort: sort[data.sort], page: data.page, subport: data.subport})
            .then(result => {
                console.log('p/category Succesfully returned');
                //console.log(result);
                return cb(null,result);
            })
            .catch(error => {console.log('p/subport/ error');console.log(error);return cb(error)});
    }
};

exports.postLoadSingle = function(data, cb){
        return guest.one(sql.loadSingle, data.post_id);
};


exports.create = function(data,cb){
     console.log('inside models/post/create');
   //text: "INSERT INTO user_data (username, name, email) VALUES ($1, $2, $3) RETURNING username", // can also be a QueryFile object
  guest.any(sql.create,data).then(result => {
      console.log('create result');
      console.log(result);
      return cb(null,result);
    })
    .catch(error => {return cb(error)});
}


/*exports.create = function(data,cb){
     console.log('inside models/post/create');
   //text: "INSERT INTO user_data (username, name, email) VALUES ($1, $2, $3) RETURNING username", // can also be a QueryFile object
  db.db.any({
        name: "post_create",
        text: "INSERT INTO post (kind, author, title, subport,tags, data) VALUES ($1, $2, $3, $4, to_jsonb([$5]), to_json($6)) RETURNING *", // can also be a QueryFile object
        values: [data.kind, data.author, data.title, data.subport, data.tags, JSON.stringify(data.data)]
      }).then(result => {
      console.log('create result');
      console.log(result);
      return cb(null,result);
    })
    .catch(error => {return cb(error)});
}*/

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
