'use strict';

var Address = require('../../models/Address');
var GeoLocator = require('../../models/GeoLocator');

var LocationSelectorCtrl = function ($scope, GeocodeFactory, $timeout) {

    var _mapModel = $scope.locationSelectorCtrl.mapModel;

    var handleResult = function (en, e, args, json) {
        $timeout(function () {
            var address = new Address();
            address.initFromGeocoder(json);
            _mapModel.address = address;
            $scope.loc = address.formattedGPSLocation();
            $scope.address = address.address();
            updateMarkerLocation(address);
            $scope.locationSelectorCtrl.eventHandler(en, e, args, address);
        });
    };

    var updateMarkerLocation = function (address) {
        $timeout(function () {
            _mapModel.updateMarker(address);
            $scope.$apply();
        });
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

    $scope.loc = _mapModel.address.formattedGPSLocation();
    $scope.searchText = '';

    if (_mapModel.address.isVerified) {
        $scope.address = _mapModel.address.address();
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
        if (text.length > 2) geocode('geocode', text)
            .then(function (json) {
                handleResult(undefined, undefined, undefined, json[0]);
            });
    };

    $scope.centerOnMarker = function () {
        _mapModel.centerOnMarker();
    };

    $scope.useCurrent = function () {
        $scope.loading = true;
        geoLocator.locate()
            .then(function (location) {
                return {lat: location.coords.latitude, lng: location.coords.longitude};
            })
            .then(function (marker) {
                return geocode('reverse', marker);
            })
            .then(function (json) {
                handleResult(undefined, undefined, undefined, json[0]);
            });
    };

    $scope.submit = function () {
        $scope.locationSelectorCtrl.eventHandler(undefined, undefined, undefined, _mapModel.address);
        $scope.address = _mapModel.address.address();
    };

    $scope.opacity = function () {
        return ($scope.loading) ? '1.0' : '0.0';
    };
};

LocationSelectorCtrl.$inject = ['$scope', 'GeocodeFactory', '$timeout'];
module.exports = LocationSelectorCtrl;