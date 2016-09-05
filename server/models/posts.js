var utils = require('../config/utils');
var guest = require('../config/postgres').guest;
var sort = ['score', 'vote_up', 'date'];

var sql = require('../sql/sql.js').posts; // our sql for users;


//Return all posts as objects inside an array
//they get merged inside promse.all -> then
//i have to do this because big querys return arrays of items
exports.postsLoadAll = function(data){
    return guest.many(sql.loadAll, {sort: sort[data.sort],page: data.page})
        .then(result => {
                //console.log('p/all Succesfully returned');
                //console.log(result);
                //console.log('p/all Succesfully returned AFTER RESULT');
                return result[0].posts;
            })
            .catch(error => {console.log('p/subport/ error');console.log(error);return error});

};

exports.postsLoadCategory = function(data, cb){
    // sort hot top date
      return guest.many(sql.loadCategory,{sort: sort[data.sort], page: data.page, subport: data.subport})
            .then(result => {
                console.log('p/category Succesfully returned');
                //console.log(result);
                return result[0].posts;
            })
            .catch(error => {console.log('p/subport/ error');console.log(error);return cb(error)});

};

exports.postLoadSingle = function(data, cb){
        return guest.one(sql.loadSingle, data.post_id)
                .then(result => {
                    //console.log('p/load signle Succesfully returned');
                    //console.log(result);
                    //console.log('p/load signle  returned AFTER RESULT');
                return [result.posts];
            })
            .catch(error => {console.log('p/subport/ error');console.log(error);return error});

};