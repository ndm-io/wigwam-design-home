var Base = require('./WWBase');
var _ = require('lodash');
var Feature = require('./Feature');

function Address (json) {
    if (json) {
        this.initFromJson(json);
    } else {
        this.loc = new Feature();
    }
}

Address.prototype.initPrimitives = Base.initPrimitives;

Address.prototype.initFromJson = function (json) {
    this.initPrimitives(json);
    this.loc = new Feature('Point', json.loc.geometry.coordinates, json.loc.properties);
};

Address.prototype.initFromGeocoder = function (res) {
    if (!res) {
        return new Address();
    }

    this.address1 = res.streetNumber;
    this.address2 = res.streetName;
    this.address3 = res.county || res.city;
    this.postcode = res.zipcode;

    this.loc = new Feature('Point', [res.longitude, res.latitude]);

    console.log(this);
    return this;
};

Address.prototype.addressKeys = function () {
    return ['address1', 'address2', 'address3', 'postcode'];
};

Address.prototype.placeholderForKey = function (key) {
    var vals = {
        'address1': 'House Name and Street',
        'address2': 'Locale',
        'address3': 'County',
        'postcode': 'Postcode'
    };
    return vals[key];
};

Address.prototype.address = function () {
    var keys = this.addressKeys();
    var array = [];
    var self = this;
    _.each(keys, function (key) {
       if (self[key]) array.push(self[key]);
    });
    return array;
};

Address.prototype.formattedGPSLocation = function () {
    if (!this.loc) return '::';
    var marker = this.loc.marker();
    return marker.lat + ' : ' + marker.lng;
};

Address.prototype.marker = function () {
    return this.loc.marker();
};

Address.prototype.isVerified = function () {
    return (this.loc.verified());
};

module.exports = Address;