'use strict';

function Location (json) {
    json = json || {};
    this.feature = json.feature;
    this.county = json.county;
}

module.exports = Location;