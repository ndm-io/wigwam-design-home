/**
 * Module dependencies.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var csrf = require('lusca').csrf();
var methodOverride = require('method-override');

var _ = require('lodash');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

/** API keys and Passport configuration.
 */
var passportConf = require('./config/passport');
var secrets = require('./config/secrets');
var routes = require('./config/routes');
var CONST = require('./config/constants.js');
var root = {root: CONST.HTMLDIR()};

/**
 * Create Express server.
 */

var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

/**
 * Connect to MongoDB.
 */

mongoose.connect(secrets.db);
mongoose.connection.on('error', function () {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});


/**
 * CSRF whitelist.
 */

var csrfExclude = ['/incoming'];

/**
 * Express configuration.
 */


app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(connectAssets({
    paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js'), path.join(__dirname, 'public/html')],
    helperContext: app.locals
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
    store: new MongoStore({url: secrets.db, auto_reconnect: true})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    // CSRF protection.
    if (_.contains(csrfExclude, req.path)) return next();
    csrf(req, res, next);

});
app.use(function (req, res, next) {
    // Make user object available in templates.
    res.locals.user = req.user;
    next();
});
app.use(function (req, res, next) {
    // Remember original destination before login.
    var path = req.path.split('/')[1];
    if (/auth|login|logout|signup|fonts|favicon|api|js|images|css|tweets/i.test(path)) {
        return next();
    }
    req.session.returnTo = req.path;
    next();
});
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

/**
 * Main routes.
 */

routes.initRoutes(app, passport, passportConf);


// Handle 404
app.use(function (req, res) {
    res.status(404);
    res.sendFile('error.html', root);
});

// Handle 500
app.use(function (error, req, res, next) {
    console.log(error);
    res.status(500);
    res.sendFile('error.html', root);
});


/**
 * Start Express server.
 */


http.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;