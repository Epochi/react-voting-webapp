var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var secrets = require('./config/secrets');
var webpack = require('webpack');
var config = require('../webpack/webpack.config.dev.js');
var port = process.env.PORT || 3000;
var app = express();
var compiler = webpack(config);


// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

// developent reloading
var isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// Bootstrap passport config
require('./config/passport')(app, passport);
// Bootstrap application settings
require('./config/express')(app, passport);
// Bootstrap routes
require('./config/routes')(app, passport);

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}


function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(secrets.db, options).connection;
}


