'use strict';

var Feature = require('../Feature');

exports.featureFromJson = function featureFromJson(json) {

    var feature = new Feature();
    feature.initFromJson(json);
    return feature;

};