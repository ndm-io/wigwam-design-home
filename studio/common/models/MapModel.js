'use strict';

var AddressFactory = require('./factories/AddressFactory'),
    LocationFactory = require('./factories/LocationFactory');

var MapModel = function (user, leafletMarkerEvents) {

    var center = function () {
        if (user.hasVerifiedAddress()) {
            var marker = user.address.marker();
            marker.zoom = 12;
            return marker;
        }
        return {
            autoDiscover: true
        };
    };

    //var mq = 'http://otile4.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png';
    //var cycle = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png';
    var osm = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    var model = {
        center: center(),
        events: {
            markers: {
                enable: leafletMarkerEvents.getAvailableEvents()
            }
        },
        markers: {},
        loc: ':',
        height: '250px',
        address: user.address,
        location: user.location,
        defaults: {
            tileLayer: osm,
            path: {
                weight: 10,
                color: '#800000',
                opacity: 1
            }
        },
        updateFromGeocodeResult: function (result) {
            this.address = AddressFactory.addressFromGeocodeResult(result);
            this.location = LocationFactory.randomizedLocationFromGeocodeResult(result);
            this.updateMarker(this.address);
        },
        updateFromAddress: function (address) {
            this.address = address;
            this.location = address.loc;
            this.updateMarker(address);
        },
        updateMarker: function (address) {
            if (!address) return;
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
        var marker = user.address.loc.marker();
        marker.draggable = true;
        model.markers.defaultLocation = marker;
    }

    return model;
};

module.exports = MapModel;