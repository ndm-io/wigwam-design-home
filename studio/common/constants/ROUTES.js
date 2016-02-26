'use strict';

var CONSTANTS = (function () {
    var API = '/api/v1/';
    return {
        login: API + 'login',
        logout: API + 'logout'
    };
}());

CONSTANTS.$inject = [];
module.exports = CONSTANTS;