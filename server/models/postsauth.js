var utils = require('../config/utils');
var user = require('../config/postgres').user;
var sort = ['score', 'vote_up', 'date'];
var sql = require('../sql/sql.js').postsAuth; // our sql for users;



exports.postsLoadAll = function(data){
    return user.many(sql.loadAll, {sort: sort[data.sort],page: data.page, username: data.username})
        .then(result => {
                //console.log('p/category Succesfully returned');
                //console.log(result);
                //console.log('p/category Succesfully returned AFTER RESULT');
                return result[0].posts;
            })
            .catch(error => {console.log('p/subport/ error');console.log(error);return error});
};

exports.postsLoadCategory = function(data, cb){
    // sort hot top date
       return user.many(sql.loadCategory,{sort: sort[data.sort], page: data.page, subport: data.subport, username: data.username})
            .then(result => {
                //console.log('p/category Succesfully returned');
                //console.log(result);
                return result[0].posts
            })
            .catch(error => {console.log('p/subport/ error');console.log(error);return cb(error)});
};

exports.postLoadSingle = function(data, cb){
        return user.one(sql.loadSingle, {post_id: data.post_id, username: data.username})
                .then(result => {
                    //console.log('p/loadauth signle Succesfully returned');
                    //console.log(result);
                    //console.log('p/loadauth signle  returned AFTER RESULT');
                return [result.posts];
            })
            .catch(error => {console.log('p/subport/ error');console.log(error);return error});
                
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


exports.commentCreate = function (data,cb){
    console.log('in comment create')
    console.log(data);
    return user.none(sql.commentCreate, {parent_id: data.parent_id, post_id: data.post_id, author: data.username, path: data.path, data: data.data })
        .then(result => {
                //console.log('p/category Succesfully returned');
                //console.log(result);
                //console.log('p/category Succesfully returned AFTER RESULT');
                return result;
            })
            .catch(error => {return cb(error)});
}


exports.commentLoadAll = function(data){
    return user.many(sql.commentLoadAll, data.post_id)
        .then(result => {
                //console.log('p/category Succesfully returned');
                //console.log(result);
                //console.log('p/category Succesfully returned AFTER RESULT');
                return result;
            })
            .catch(error => {console.log('p/commentloadall/ error');console.log(error);return error});
};