'use strict';

var Promise = require('promise');
var $ = require('jquery');

var CommsFactory = function($rootScope, $http, ROUTES) {

    var http = $http;
    http.defaults.headers.post["X-CSRF-Token"] = $('meta[name="csrf-token"]').attr("content");

    return {
        http: http,
        ukChart: function () {
            return http.get(ROUTES.ukChart)
                .then(function (response) {
                    return response.data;
                });
        }
    }

};

CommsFactory.$inject = ['$rootScope', '$http', 'ROUTES'];
module.exports = CommsFactory;