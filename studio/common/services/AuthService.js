'use strict';

var Promise = require('promise');

var AuthService = function (CommsFactory, SessionService, ROUTES, USER_ROLES) {
    var authService = {};

    authService.profile = function () {

        if (SessionService.user) {
            console.log('returning fom cache: ', SessionService.user);
            return Promise.resolve(SessionService.user);
        }
        return CommsFactory.http
            .get(ROUTES.profile)
            .then(function (res) {
                console.log('creating: ', res.data);
                return SessionService.create(res.data);
            });
    };

    authService.sendToken = function (credentials) {
        console.log('attempting to cause a tokento be sent');
        return CommsFactory.http
            .post(ROUTES.sendToken, credentials)
            .then(function (response) {
                console.log('send token resposne', response);
                return response;
            });
    };

    authService.logout = function () {

        return CommsFactory.http
            .post(ROUTES.logout)
            .then(function (res) {
                SessionService.destroy();
                return res.data;
            });
    };

    authService.isAuthenticated = function () {
        return !!SessionService.userId;
    };

    authService.isAuthorized = function (forRole) {
        var userRole = SessionService.userRole || USER_ROLES.anon;
        return (userRole >= forRole);
    };

    return authService;
};

AuthService.$inject = ['CommsFactory', 'SessionService', 'ROUTES', 'USER_ROLES'];
module.exports = AuthService;

