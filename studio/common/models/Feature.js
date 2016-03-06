/**
 *
 */

function Feature(type, coordinates, properties) {
    this.type = 'Feature';
    this.geometry = {
        type: type || 'Point',
        coordinates: coordinates || []
    };
    this.properties = properties || {};
    return this;
}

Feature.prototype.initFromJson = function (geojson) {
    this.type = geojson.type;
    this.geometry = geojson.geometry;
    this.properties = geojson.properties;
};

Feature.prototype.verified = function () {
    return (this.geometry.coordinates.length >= 1);
};

Feature.prototype.resetCoordinates = function () {
    this.geometry.coordinates.length = 0;
};

Feature.prototype.marker = function () {
    if (!this.verified()) {
        return {lat:'??', lng:'??'};
    }
    return {
        lat: this.geometry.coordinates[1],
        lng: this.geometry.coordinates[0]
    }
};


module.exports = Feature;