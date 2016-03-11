'use strict';

var Promise = require('promise');
var $ = require('jquery');

var CommsFactory = function ($rootScope, $http, ROUTES) {

    var http = $http;
    http.defaults.headers.post["X-CSRF-Token"] = $('meta[name="csrf-token"]').attr("content");

    return {
        http: http,
        ukChart: function () {
            return http.get(ROUTES.ukChart)
                .then(function (response) {
                    return response.data;
                });
        },
        geocode: function (address) {
            return http.post(ROUTES.geocode, {address: address}, {})
                .then(function (response) {
                    return response.data;
                });
        },
        reverse: function (coords) {
            return http.post(ROUTES.reverse, coords, {})
                .then(function (response) {
                    return response.data;
                });
        },
        updateAddress: function (address) {
            return http.post(ROUTES.updateAddress, {address: address}, {})
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }
    }

};

CommsFactory.$inject = ['$rootScope', '$http', 'ROUTES'];
module.exports = CommsFactory;