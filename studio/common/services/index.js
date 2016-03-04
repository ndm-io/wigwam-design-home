'use strict';

// Services and Factories have their first letter capitalized like Controllers

module.exports = angular.module('common.services', [])
    .factory('DataFactory', require('./DataFactory.js'))
    .factory('CommsFactory', require('./CommsFactory.js'))
    .factory('AuthService', require('./AuthService.js'))
    .factory('SessionService', require('./SessionService.js'))
    .factory('AuthInterceptor', require('./AuthInterceptor.js'))
    .factory('GeocodeFactory', require('./GeocodeFactory.js'));