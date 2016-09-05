var crypto = require('crypto');
var utils = require('../config/utils');
var auth = require ('../config/postgres').auth;

var sql = require('../sql/sql.js').usersAuth;

exports.validation = function(body,cb){
  var errors = [];
  
  if(!utils.validateEmail(body.email)){
    errors.push({email: 'Blogas el. pašto adresas'});
  }
  if(body.password.length < 6){
    errors.push({password: 'Slaptažodis turi būti nors 6 raidžių/skaičių'});
  }
  if(!utils.validateWhitespaces(body.password)){
    errors.push({password: 'Slaptažodyje negali būti tarpų'});
  }
  if(!utils.validateWhitespaces(body.username)){
    errors.push({username: 'Vartotojo varde negali būti tarpų'});
  }
  if (body.username.length < 6){
    errors.push({username: 'Vartotojo vardas turi būti nors 6 raidžių'});
  }
  if (errors.length > 0){
    return cb({stack: 'ValidationError', errors: errors});
  } else{
    return cb();
  }
  
  
};


//THIS IS NOT USED YET
exports.create = function(req, cb){

  var user = {
    username: req.body.username.toLowerCase(),
    name: req.body.username,
    email: req.body.email.toLowerCase()
  };
   //text: "INSERT INTO user_data (username, name, email) VALUES ($1, $2, $3) RETURNING username", // can also be a QueryFile object
  auth.one({
        name: "user_data_create",
        text: "INSERT INTO user_data (username, name, email) VALUES ($1, $2, $3) RETURNING name, username,email, postscore, commentscore", // can also be a QueryFile object
        values: [user.username, user.name, user.email]
      }).then(result => {
      console.log('create result');
      console.log(result);
      return cb(null,user);
    })
    .catch(error => {return cb(error)});
};


//currently active
exports.createLocal = function(req, cb){

  var csalt = utils.makeSalt();
  var chashed_password = encryptPassword(req.body.password, csalt);
  console.log('createLocal inside');
  var data = {
    email: req.body.email.toLowerCase(),
    username: req.body.username,
    salt:  csalt,
    hashed_password: chashed_password
  };
  
  auth.one({
        name: "user_auth_create",
        text: "INSERT INTO user_auth (name,email, salt, hashed_password) VALUES ($1, $2, $3, $4) RETURNING name;",
        values: [data.username, data.email, data.salt, data.hashed_password]
      }).then(result => {
      console.log('createLocal result');
      console.log(result);
      return cb(null, data);
    })
    .catch(error => {return cb(error)});
};


/*
    console.log('inside loadlocal');
    console.log(options);
      var query_text = 'SELECT ARRAY["'+options.criteria +'", "salt", "hashed_password" ] FROM user_auth WHERE '+options.criteria +'= $1 LIMIT 1';

*/

exports.loadLocal = function (options ,cb){
  
  auth.one(sql.loadLocal, {criteria: options.criteria, user: options.select})
  .then(result => {
      console.log('loadocal result');
      console.log(result);
      //return if it's empty
      if(result === null){
       return cb({stack: 'passportLocalError', errors: { username: {path: "username", message: "Vartotojas nerastas" }}});
      } else if(!authenticate(options.password,result.array[1], result.array[2])){
        return cb({stack: 'passportLocalError', errors: { password: {path: "password", message: "Neteisingas slaptažodis" }}});
      } else{
      return cb(null, result.array[0]);
      }
    })
    .catch(error => {console.log('load local error');console.log(error);return cb(error)});
};

/*
var query_text = 'SELECT row_to_json(row) FROM (SELECT name, username, post_score, comment_score FROM user_metadata WHERE username = $1 LIMIT 1) AS row';
  auth.query(query_text, [username], qrm.one | qrm.none)
*/


exports.load = function (username ,cb){
    console.log('inside load');
    console.log(username);
    auth.one(sql.load, {username: username})
      .then(result => {
          console.log('load result');
          console.log(result);
          return cb(null, result.row_to_json );
        })
        .catch(error => {return cb(error)});
};

exports.loadFull = function (options ,cb){
    console.log('inside load');
    console.log(options);
  auth.query('SELECT * FROM user_data WHERE username = $1 LIMIT 1', [options.select], qrm.one | qrm.none)
  .then(result => {
      console.log('load result');
      console.log(result);

      return cb(null, result.array[0]);
    })
    .catch(error => {return cb(error)});

};


function authenticate(plainText,salt,hashed_password){
   return encryptPassword(plainText,salt) === hashed_password;
}

function encryptPassword(password, salt) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
};