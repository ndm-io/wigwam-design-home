'use strict';

function Feature(lat, lng) {
    this.type = 'Feature';
    this.geometry = {
        coordinates: [
            lng,
            lat
        ],
        type: 'Point'
    };

    this.properties = {
        title: 'Anonymized Location'
    };
}

module.exports = function (feature, radius) {

    radius = radius || 1000;

    var r = radius / 111300,
        y0 = feature.geometry.coordinates[1],
        x0 = feature.geometry.coordinates[0],
        u = Math.random(),
        v = Math.random(),
        w = r * Math.sqrt(u),
        t = 2 * Math.PI * v,
        x = w * Math.cos(t),
        y1 = w * Math.sin(t),
        x1 = x / Math.cos(y0);

    var newY = y0 + y1,
        newX = x0 + x1;

    return new Feature(parseFloat(newY.toFixed(6)), parseFloat(newX.toFixed(6)));
};