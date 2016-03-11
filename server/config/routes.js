//var User = require('../models/User');
//var secrets = require('./secrets');
//var dataController = require('../controllers/data');
var homeController = require('../controllers/home');
var studioController = require('../modules/studio/studioController');
var loginController = require('../modules/studio/loginController');

var geocodeController = require('../modules/studio/geocodeController');

var userController = require('../modules/studio/userController');

//var apiController = require('../controllers/api');
//var tweetController = require('../controllers/tweet');
//var userController = require('../controllers/user');
//var staticController = require('../controllers/static');
////var adminController = require('../controllers/admin');
//
//
//var multer = require('multer');
//var upload = multer({dest: 'uploads/'});

var c = require('./constants');
var roles = c.ROLES;
var apiPrefix = c.API_PREFIX;

var urls = {
    home: {
        url: '/',
        role: roles.anon,
        fn: homeController.index
    },
    about: {
        url: '/about',
        role: roles.anon,
        fn: homeController.about
    },
    studio: {
        url: '/studio',
        role: roles.anon,
        fn: studioController.index
    },
    profile: {
        url: '/profile',
        role: roles.anon,
        fn: function (req, res) {
            if (req.isAuthenticated()) {
                res.send(req.user.model());
            } else {
                res.sendStatus(401);
            }
        }
    },
    geocode: {
        url: apiPrefix + 'geocode',
        role: roles.anon,
        fn: geocodeController.geocode
    },
    reverse: {
        url: apiPrefix + 'reverse',
        role: roles.anon,
        fn: geocodeController.reverse
    },
    login: {
        url: apiPrefix + 'login',
        role: roles.anon,
        fn: loginController.login
    },
    logout: {
        url: apiPrefix + 'logout',
        role: roles.anon,
        fn: loginController.logout
    },
    updateAddress: {
        url: apiPrefix + 'updateaddress',
        role: roles.anon,
        fn: userController.updateAddress
    },
    updateProfile: {
        url: apiPrefix + 'updateprofile',
        role: roles.anon,
        fn: userController.updateProfile
    }
};

exports.urls = urls;
exports.initRoutes = function (app, passport, passportConf, io) {

    /**
     * Main routes for SPA
     */

    app.get(urls.home.url, urls.home.fn);
    app.get(urls.about.url, urls.about.fn);

    /**
     * Studio Route
     */
    app.get(urls.studio.url, urls.studio.fn);

    /**
     * API Routes
     */

    app.get(urls.profile.url, urls.profile.fn);
    app.post(urls.login.url, passport.authenticate('local'), urls.login.fn);
    app.post(urls.logout.url, urls.logout.fn);

    app.post(urls.geocode.url, passportConf.isAuthenticated, urls.geocode.fn);
    app.post(urls.reverse.url, passportConf.isAuthenticated, urls.reverse.fn);

    app.post(urls.updateAddress.url, passportConf.isAuthenticated, urls.updateAddress.fn);
    app.post(urls.updateProfile.url, passportConf.isAuthenticated, urls.updateProfile.fn);

};

//exports.init = function (app, passport, passportConf, io) {
//
//    /**
//     * Setup tweet socket.io
//     */
//    //tweetController.initTweetHandler(io);
//
//    /**
//     * Main route for SPA
//     */
//    app.get('/', homeController.index);
//
//    /**
//     * Main route for Admin
//     */
//        //app.get('/admin', adminController.index);
//    app.get('/admin/loggedin', passportConf.isPrivileged, function (req, res) {
//        res.send(req.user);
//    });
//
//    /**
//     * Incoming mail webhook
//     */
//
//    app.post('/incoming', function (req, res) {
//        console.log(req.body);
//        res.sendStatus(200);
//    });
//
//    /**
//     * Normal website routes
//     */
//
//    app.get('/api/recentnews/:limit', dataController.getNewsItems);
//    app.get('/api/portfolioprojects/:limit', dataController.getProjectItems);
//    app.get('/api/tweets/:limit', tweetController.getTweets);
//    app.get('/api/colors', dataController.getColors);
//
//
//    /**
//     * Client API routes
//     */
//
//    app.post('/api/logout', function (req, res) {
//        req.logOut();
//        res.sendStatus(200);
//    });
//    app.post('/api/signup', userController.postSignup);
//    app.post('/api/forgot', userController.postForgot);
//    app.post('/api/reset', userController.postReset);
//
//    app.get('/loggedin', function (req, res) {
//        res.send(req.isAuthenticated() ? req.user.model() : '0');
//    });
//    app.get('/api/recaptcha', function (req, res) {
//        res.send({siteKey: secrets.recaptcha.siteKey});
//    });
//    app.post('/api/login', passport.authenticate('local'), function (req, res) {
//        res.send(req.user.model());
//    });
//
//    /*
//     * Authenticated user routes
//     */
//    app.get('/api/account', passportConf.isAuthenticated, userController.getAccount);
//    app.post('/api/account', passportConf.isAuthenticated, userController.postUpdateAccount);
//    app.post('/api/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
//    app.get('/api/subcontractors', passportConf.isAuthenticated, apiController.getSubContractors);
//
//    app.post('/api/new/concept', passportConf.isAuthenticated, apiController.postNewConcept);
//    app.post('/api/submit/concept', passportConf.attachProject, apiController.postSubmitConcept);
//    app.post('/api/delete/concept', passportConf.attachProject, apiController.postDeleteConcept);
//    app.get('/api/projects', passportConf.isAuthenticated, apiController.getClientProjects);
//    app.get('/api/project/:projectId', passportConf.attachProject, apiController.getProject);
//    app.get('/api/project/:projectId/invoice/:invoiceGuid', passportConf.attachProject, apiController.getInvoice);
//
//    app.post('/api/new/message', passportConf.attachProject, apiController.postNewMessage);
//    app.post('/api/update/message', passportConf.attachProject, apiController.postUpdateMessage);
//    app.post('/api/markread/allmessages', passportConf.attachProject, apiController.postMarkAllRead);
//    app.post('/api/markread/messages', passportConf.attachProject, apiController.postMarkRead);
//
//    app.get('/api/events', passportConf.isAuthenticated, apiController.getEvents);
//    app.post('/api/new/event', passportConf.attachProject, apiController.postNewEvent);
//    app.post('/api/update/event', passportConf.attachProject, apiController.postUpdateEvent);
//    app.post('/api/delete/event', passportConf.attachProject, apiController.postDeleteEvent);
//
//    app.get('/api/project/:projectId/image/:imageGuid', passportConf.attachProject, apiController.getImage);
//    app.post('/api/new/imageurl', passportConf.attachProject, apiController.postNewImageUrl);
//    app.post('/api/new/imageupload', passportConf.isAuthenticated, upload.array('file', 12), apiController.postNewImageUpload);
//    app.post('/api/delete/image', passportConf.attachProject, apiController.postDeleteImage);
//
//    app.post('/api/new/initialconsultation', passportConf.attachProject, apiController.postNewInitialConsultation);
//    app.post('/api/new/iccolor', passportConf.attachProject, apiController.postNewIcColor);
//    app.post('/api/delete/icolor', passportConf.attachProject, apiController.postDeleteIcColor);
//    app.post('/api/new/icimage', passportConf.attachProject, apiController.postNewIcImage);
//    app.post('/api/delete/icimage', passportConf.attachProject, apiController.postDeleteIcImage);
//    app.post('/api/update/initialconsultation', passportConf.attachProject, apiController.postUpdateIc);
//    app.post('/api/lock/initialconsultation', passportConf.attachProject, apiController.postLockIc);
//
//    /**
//     * Pages rendered by the server for the data sent in the post req
//     */
//
//    app.post('/shoppinglist', passportConf.isAuthenticated, staticController.shoppingList);
//
//
//    /**
//     * Privileged user routes... requires url to be in authorizedRoutes or isPrivileged set true
//     */
//
//    app.post('/api/update/subcontractor', passportConf.isPrivileged, apiController.postSubContractor);
//    app.post('/api/delete/subcontractor', passportConf.isPrivileged, apiController.postDeleteSubContractor);
//
//    app.post('/api/delete/color', passportConf.isPrivileged, dataController.postDeleteColor);
//    app.post('/api/new/color', passportConf.isPrivileged, dataController.postNewColor);
//    app.post('/api/update/color', passportConf.isPrivileged, dataController.postUpdateColor);
//
//    app.post('/api/new/icdi', passportConf.attachProject, apiController.postNewIcdi);
//    app.post('/api/delete/icdi', passportConf.attachProject, apiController.postDeleteIcdi);
//
//    app.get('/api/users', passportConf.isPrivileged, apiController.getUsers);
//    app.post('/api/update/user', passportConf.isPrivileged, apiController.postUser);
//    app.post('/api/delete/user', passportConf.isPrivileged, apiController.postDeleteUser);
//
//    app.post('/api/remove/client', passportConf.attachProject, apiController.postRemoveClient);
//    app.post('/api/add/client', passportConf.attachProject, apiController.postAddClient);
//
//    app.post('/api/upgrade/concept', passportConf.attachProject, apiController.postUpgradeConcept);
//
//    app.post('/api/new/project', passportConf.isPrivileged, apiController.postNewProject);
//    app.get('/api/admin/projects', passportConf.isPrivileged, apiController.getAdminProjects);
//
//    app.post('/api/update/task', passportConf.isPrivileged, apiController.postUpdateTask);
//    app.post('/api/new/task', passportConf.isPrivileged, apiController.postNewTask);
//
//    app.post('/api/new/product', passportConf.attachProject, apiController.postNewProduct);
//    app.post('/api/update/product', passportConf.attachProject, apiController.postUpdateProduct);
//    app.post('/api/update/products', passportConf.attachProject, apiController.postUpdateProducts);
//    app.post('/api/delete/products', passportConf.attachProject, apiController.postDeleteProducts);
//
//    app.post('/api/new/invoice', passportConf.attachProject, apiController.postNewInvoice);
//    app.post('/api/update/invoice', passportConf.attachProject, apiController.postUpdateInvoice);
//    app.post('/api/send/invoice', passportConf.attachProject, apiController.postSendInvoice);
//    app.post('/api/send/receipt', passportConf.attachProject, apiController.postSendReceipt);
//
//    app.post('/api/new/quote', passportConf.attachProject, apiController.postNewQuote);
//    app.post('/api/update/quote', passportConf.attachProject, apiController.postUpdateQuote);
//    app.post('/api/delete/quote', passportConf.attachProject, apiController.postDeleteQuote);
//    app.post('/api/send/quote', passportConf.attachProject, apiController.postSendQuote);
//
//
//};
