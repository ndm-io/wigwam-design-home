'use strict';

var Feature = require('../Feature');

exports.featureFromJson = function featureFromJson(json) {

    if (!json) return;

    var feature = new Feature();
    feature.initFromJson(json);
    return feature;

};