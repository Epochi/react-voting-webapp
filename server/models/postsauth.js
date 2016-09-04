var utils = require('../config/utils');
var user = require('../config/postgres').user;
var sort = ['score', 'vote_up', 'date'];
var sql = require('../sql/sql.js').postsAuth; // our sql for users;



exports.postsLoadAll = function(data){
    user.many(sql.loadAll, {sort: sort[data.sort],page: data.page, username: data.username});
};

exports.postsLoadCategory = function(data, cb){
    // sort hot top date
        user.many(sql.loadCategory,{sort: sort[data.sort], page: data.page, subport: data.subport})
            .then(result => {
                console.log('p/category Succesfully returned');
                //console.log(result);
                return cb(null,result);
            })
            .catch(error => {console.log('p/subport/ error');console.log(error);return cb(error)});
};

exports.postLoadSingle = function(data, cb){
        return user.one(sql.loadSingle, data.post_id);
};


exports.create = function(data,cb){
     console.log('inside models/post/create');
   //text: "INSERT INTO user_data (username, name, email) VALUES ($1, $2, $3) RETURNING username", // can also be a QueryFile object
  user.any(sql.create,data).then(result => {
      console.log('create result');
      console.log(result);
      return cb(null,result);
    })
    .catch(error => {return cb(error)});
}

