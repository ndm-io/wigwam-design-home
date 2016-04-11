'use strict';

var Address = require('../Address');

exports.addressFromGeocodeResult = function (result) {
    var address = new Address();
    address.initFromGeocoder(result);
    return address;
};