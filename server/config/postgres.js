
var options = {pgNative: true};
var secrets = require('./secrets');
var QueryFile = require('pg-promise').QueryFile;
var path = require('path');
if (process.env.NODE_ENV === 'development'){
var monitor = require("pg-monitor");
monitor.attach(options);
}

var pgp = require('pg-promise')(options);



//var cn = "postgres://postgres_user:password@0.0.0.0:5432/my_postgres_db";
var guest = pgp(secrets.postgresGuest);
var user = pgp(secrets.postgresUser);
var auth = pgp(secrets.postgresAuth);



module.exports = {
    pgp, guest, auth, user
};


exports.query = function(sql, params, cb) {
  guest.any(sql,params, function(err, result){
    if (err) { return err;}
    console.log('rezalt');
    return result;
  });
}
