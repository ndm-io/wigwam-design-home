'use strict';

var GeocodeFactory = function (CommsFactory) {
    return {
        geocode: function (address) {
            return CommsFactory.geocode(address);
        },
        reverse: function (coords) {

            var data = {lat:coords.lat, lon:coords.lng};
            console.log(coords, data);
            return CommsFactory.reverse(data);
        }
    }
};

GeocodeFactory.$inject = ['CommsFactory'];
module.exports = GeocodeFactory;