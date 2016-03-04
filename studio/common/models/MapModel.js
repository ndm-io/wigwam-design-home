'use strict';

var MapModel = function (user, leafletMarkerEvents) {

    var center = function () {
        if (user.hasVerifiedAddress()) {
            var marker = user.address.marker();
            marker.draggable = true;
            marker.message = 'Default Location';
            return marker;
        }
        return {
            autoDiscover: true
        };
    };

    var model = {
        center: center(),
        events: {
            markers: {
                enable: leafletMarkerEvents.getAvailableEvents()
            }
        },
        loc: ':',
        height: '200px',
        address: user.address
    };


    if (user.hasVerifiedAddress()) {
        model.markers = user.address.loc.marker();
    }

    return model;
};

module.exports = MapModel;