var pg = require('pg');
var secrets = require('./secrets');

exports.query = function(sql, params, cb) {
  pg.connect(secrets.db, function(err, client, done) {
    if (err) { 
      done(); // release client back to pool
      cb(err);
      return;
    }
    client.query(sql, params, cb);
  });
}
