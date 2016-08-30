var monitor = require("pg-monitor");
var options = {pgNative: true};
var secrets = require('./secrets');
var QueryFile = require('pg-promise').QueryFile;
var path = require('path');
monitor.attach(options);

var pgp = require('pg-promise')(options);



//var cn = "postgres://postgres_user:password@0.0.0.0:5432/my_postgres_db";
var db = pgp(secrets.postgresdb);



module.exports = {
    pgp, db
};


exports.query = function(sql, params, cb) {
  db.any(sql,params, function(err, result){
    if (err) { return err;}
    console.log('rezalt');
    return result;
  });
}
