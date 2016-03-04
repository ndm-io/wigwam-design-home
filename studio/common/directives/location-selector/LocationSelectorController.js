'use strict';

var Address = require('../../models/Address');
var GeoLocator = require('../../models/GeoLocator');

var LocationSelectorCtrl = function ($scope, GeocodeFactory, $timeout) {

    var handleResult = function (en, e, args, json) {
        $timeout(function () {
            var address = new Address();
            address.initFromGeocoder(json);
            $scope.locationSelectorCtrl.eventHandler(en, e, args, address);
            $scope.loc = address.formattedGPSLocation();
            $scope.address = address.address();
            updateMarkerLocation(address);
        });
    };

    var updateMarkerLocation = function (address) {
        var marker = address.marker();
        marker.draggable = true;

        var mapModel = $scope.locationSelectorCtrl.mapModel;

        if (mapModel.markers && mapModel.markers.defaultLocation) {
            mapModel.markers.defaultLocation = marker;
        } else {
            mapModel.markers = {
                defaultLocation: marker
            }
        }

        mapModel.center.lat = marker.lat;
        mapModel.center.lng = marker.lng;

        $scope.$apply();
    };

    var geoLocator = new GeoLocator();

    $scope.loading = false;

    var geocode = function (mode, data) {
        $scope.loading = true;
        return GeocodeFactory[mode](data)
            .then(function (result) {
                $scope.loading = false;
                return result;
            })
            .catch(function (err) {
                console.log('error in geocoding', err);
            });
    };

    $scope.loc = $scope.locationSelectorCtrl.mapModel.address.formattedGPSLocation();
    $scope.searchText = '';

    if ($scope.locationSelectorCtrl.mapModel.address.isVerified) {
        $scope.address = $scope.locationSelectorCtrl.mapModel.address.address();
    }

    $scope.eventHandler = function (en, e, args) {
        var type = args.leafletEvent.type;

        if (type === 'dragend') {

            geocode('reverse', args.model) // GeocodeFactory.reverse(args.model)
                .then(function (json) {

                    var marker = json[0];
                    marker.latitude = args.model.lat;
                    marker.longitude = args.model.lng;

                    handleResult(en, e, args, marker);
                });
        }
    };

    $scope.search = function () {
        var text = $scope.searchText;
        if (text.length > 2) geocode('geocode', text) //GeocodeFactory.geocode(text)
            .then(function (json) {
                handleResult(undefined, undefined, undefined, json[0]);
            });
    };

    $scope.useCurrent = function () {
        $scope.loading = true;
        geoLocator.locate()
            .then(function (location) {
                return {lat: location.coords.latitude, lng: location.coords.longitude};
            })
            .then(function (marker) {
                return geocode('reverse', marker); // GeocodeFactory.reverse(marker);
            })
            .then(function (json) {
                handleResult(undefined, undefined, undefined, json[0]);
            });
    };

};

LocationSelectorCtrl.$inject = ['$scope', 'GeocodeFactory', '$timeout'];
module.exports = LocationSelectorCtrl;