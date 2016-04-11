'use strict';

var Location = require('../Location'),
    Feature = require('../Feature'),
    anonFeature = require('./anon-feature');

exports.randomizedLocationFromGeocodeResult = function (result) {
    var location = new Location();
    location.county = result.county || result.city;

    var feature =  new Feature('Point', [result.longitude, result.latitude]);
    location.feature = anonFeature(feature, 4000);

    return location;
};

exports.locationFromJson = function (json) {
    return new Location(json);
};