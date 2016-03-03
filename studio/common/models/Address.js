var Base = require('./WWBase');
var _ = require('lodash');
var Feature = require('./Feature');

function Address (json) {
    if (json) {
        this.initFromJson(json);
    }
}

Address.prototype.initPrimitives = Base.initPrimitives;

Address.prototype.initFromJson = function (json) {
    this.initPrimitives(json);
    this.loc = new Feature('Point', json.loc.geometry.coordinates, json.loc.properties);
    console.log(this);
};

Address.prototype.initFromGeocoder = function (gcResult) {
    this.address1 = gcResult.streetNumber;
    this.address2 = gcResult.streetName;
    this.address3 = gcResult.county;
    this.postcode = gcResult.zipcode;

    this.loc = new Feature('Point', [gcResult.longitude, gcResult.latitude]);
    return this;
};

Address.prototype.address = function () {
    return [this.address1, this.address2, this.address3, this.postcode];
};

Address.prototype.formattedGPSLocation = function () {
    var marker = this.loc.marker();
    return marker.lat + ' : ' + marker.lng;
};

Address.prototype.marker = function () {
    return this.feature.marker();
}

Address.prototype.isVerified = function () {
    return (this.loc.geometry.coordinates.length > 0);
};

module.exports = Address;