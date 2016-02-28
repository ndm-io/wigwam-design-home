'use strict';

var Promise = require('promise');

var AuthService = function (CommsFactory, SessionService, ROUTES, USER_ROLES) {
    var authService = {};

    authService.profile = function () {

        if (SessionService.user) {
            return Promise.resolve(SessionService.user);
        }
        return CommsFactory.http
            .get(ROUTES.profile)
            .then(function (res) {
                return SessionService.create(res.data);
            });
    };

    authService.login = function (credentials) {
        return CommsFactory.http
            .post(ROUTES.login, credentials)
            .then(function (res) {
                SessionService.create(res.data);
                return res.data;
            });
    };

    authService.logout = function () {
        return CommsFactory.http
            .post(ROUTES.logout, {})
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

