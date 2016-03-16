var homeController = require('../controllers/home');
var studioController = require('../modules/studio/studioController');
var loginController = require('../modules/studio/loginController');

var geocodeController = require('../modules/studio/geocodeController');

var userController = require('../modules/studio/userController');
var apiController = require('../modules/studio/apiController');


var c = require('./constants');
var roles = c.ROLES;
var apiPrefix = c.API_PREFIX;

module.exports = {
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
        fn: loginController.profile
    },
    sendToken: {
        url: apiPrefix + 'sendtoken',
        role: roles.anon,
        fn: loginController.sendToken,
        complete: loginController.complete
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
    },
    projects: {
        url: apiPrefix + 'projects',
        role: roles.anon,
        fn: apiController.projects
    }
};