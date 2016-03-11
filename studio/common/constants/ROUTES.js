'use strict';

var CONSTANTS = (function () {
    var API = '/api/v1/';
    return {
        login: API + 'login',
        logout: API + 'logout',
        profile: 'profile',
        ukChart: '/html/json/uk.topojson',
        geocode: API + 'geocode',
        reverse: API + 'reverse',
        updateAddress: API + 'updateaddress'
    };
}());

CONSTANTS.$inject = [];
module.exports = CONSTANTS;