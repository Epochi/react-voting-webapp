
var monitor = require("pg-monitor");
var options = {};
monitor.attach(options);

var pgp = require('pg-promise')(options);

var cn = {
    host: '127.0.0.1',
    port: 5432,
    database: 'yp0',
    user: 'users',
    password: 'pass1',
    ssl:true
};

//var cn = "postgres://postgres_user:password@0.0.0.0:5432/my_postgres_db";
var db = pgp(cn);



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
