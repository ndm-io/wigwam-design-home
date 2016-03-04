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

    var mq = 'http://otile4.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png';
    var cycle = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png';
    var osm = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    var model = {
        center: center(),
        events: {
            markers: {
                enable: leafletMarkerEvents.getAvailableEvents()
            }
        },
        loc: ':',
        height: '250px',
        address: user.address,
        defaults: {
            tileLayer: osm,
            path: {
                weight: 10,
                color: '#800000',
                opacity: 1
            }
        },
        updateMarker: function (address) {
            var marker = address.marker();
            marker.draggable = true;

            if (this.markers && this.markers.defaultLocation) {
                this.markers.defaultLocation = marker;
            } else {
                this.markers = {
                    defaultLocation: marker
                }
            }

            this.center.lat = marker.lat;
            this.center.lng = marker.lng;
        },
        centerOnMarker: function () {
            if (!this.markers || !this.markers.defaultLocation) return;
            var marker = this.markers.defaultLocation;
            this.center.lat = marker.lat;
            this.center.lng = marker.lng;
        }
    };

    if (user.hasVerifiedAddress()) {
        model.markers = user.address.loc.marker();
    }

    return model;
};

module.exports = MapModel;