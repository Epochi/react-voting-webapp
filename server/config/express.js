

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

  // set views path, template engine and default layout
  //app.engine('html', swig.renderFile);
  //app.set('views', config.root + 'views');
  
  //app.set('view engine', 'html');

  // expose package.json to views
  /*
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });
*/
  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer().array('image', 1));
  app.use(methodOverride(
    /*function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }*/
  ));

  // CookieParser should be above session
  app.use(cookieParser());
  app.use(cookieSession({ secret: 'zecret' }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
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

  
  

/*  if (env !== 'test') {
    app.use(csrf());

    // This could be moved to view-helpers :-)
    app.use(function (req, res, next) {
      res.locals.csrf_token = req.csrfToken();
      next();
    });
  }*/
  
  
};






/*


module.exports = function (app, passport) {
  app.set('port', (process.env.PORT || 3000));

  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.set('view cache', false);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '../..', 'public')));

  // I am adding this here so that the Heroku deploy will work
  // Indicates the app is behind a front-facing proxy,
  // and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
  // NOTE: X-Forwarded-* headers are easily spoofed and the detected IP addresses are unreliable.
  // trust proxy is disabled by default.
  // When enabled, Express attempts to determine the IP address of the client connected through the front-facing proxy, or series of proxies.
  // The req.ips property, then, contains an array of IP addresses the client is connected through.
  // To enable it, use the values described in the trust proxy options table.
  // The trust proxy setting is implemented using the proxy-addr package. For more information, see its documentation.
  // loopback - 127.0.0.1/8, ::1/128
  app.set('trust proxy', 'loopback');
  // Create a session middleware with the given options
  // Note session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
  // Options: resave: forces the session to be saved back to the session store, even if the session was never
  //                  modified during the request. Depending on your store this may be necessary, but it can also
  //                  create race conditions where a client has two parallel requests to your server and changes made
  //                  to the session in one request may get overwritten when the other request ends, even if it made no
  //                  changes(this behavior also depends on what store you're using).
  //          saveUnitialized: Forces a session that is uninitialized to be saved to the store. A session is uninitialized when
  //                  it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage
  //                  usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with
  //                  race conditions where a client makes multiple parallel requests without a session
  //          secret: This is the secret used to sign the session ID cookie.
  //          name: The name of the session ID cookie to set in the response (and read from in the request).
  //          cookie: Please note that secure: true is a recommended option.
  //                  However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies.
  //                  If secure is set, and you access your site over HTTP, the cookie will not be set.
  var sess = {
    resave: true,
    saveUninitialized: false,
    secret: secrets.sessionSecret,
    proxy: true, // The "X-Forwarded-Proto" header will be used.
    name: 'sessionId',
    // Add HTTPOnly, Secure attributes on Session Cookie
    // If secure is set, and you access your site over HTTP, the cookie will not be set
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new MongoStore(
      { 
        url: secrets.db,
        autoReconnect: true
      }
    )
  };

  var node_env = process.env.NODE_ENV;
  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log('===>  Environment: ' + node_env);
  if(node_env === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
    sess.cookie.secure = true; // Serve secure cookies
  }

  app.use(session(sess));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());


};
*/