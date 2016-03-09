//var path = require('path');
var secrets = require('./secrets');
//var flash = require('express-flash');

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//var csrf = require('csurf');
var multer = require('multer');
var swig = require('swig');

var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
//var helpers = require('view-helpers');
var config = require('./config');


var env = process.env.NODE_ENV || 'development';


module.exports = function (app, passport) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // Static files middleware
  app.use(express.static(config.root + '/..' + '/public'));

  // Use winston on production
  var log = 'dev';
  if (env !== 'development') {
    log = {
      stream: {
        write: message => winston.info(message)
      }
    };
  }

  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  // Swig templating engine settings
  if (env === 'development' || env === 'test') {
    swig.setDefaults({
      cache: false
    });
  }


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer().array('image', 1));
  app.use(methodOverride());

  // CookieParser should be above session
  app.use(cookieParser());
  app.use(cookieSession({ secret: 'zucret' }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
    cookie: {
      httpOnly: false,
      secure: true,
    },
    store: new mongoStore({
      url: secrets.db,
      collection : 'sessions'
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // should be declared after session and flash
  var node_env = process.env.NODE_ENV;
  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log('===>  Environment: ' + node_env);
  if(node_env === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
  }

  

  
};


