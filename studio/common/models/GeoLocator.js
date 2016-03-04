'use strict';

var Promise = require('Promise');

var GeoLocator = function () {

};

GeoLocator.prototype.locate = function () {
    return new Promise(function (resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve);
        } else {
            reject(new Error('This browser does not support Geolocation'));
        }
    });
};

module.exports = GeoLocator;