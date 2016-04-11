'use strict';

//var Promise = require('promise');
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
        updateAddress: function (address, location) {
            return http.post(ROUTES.updateAddress, {address: address, location:location}, {})
                .then(function (response) {
                    return response.data;
                });
        },
        updateProfile: function (data) {
            return http.post(ROUTES.updateProfile, {profile: data}, {})
                .then(function (response) {
                    return response.data;
                });
        },
        projects: function () {
            return http.get(ROUTES.projects)
                .then(function (response) {
                    return response.data;
                });
        }
    };

};

CommsFactory.$inject = ['$rootScope', '$http', 'ROUTES'];
module.exports = CommsFactory;