'use strict';

var Address = require('../../models/Address');
var GeoLocator = require('../../models/GeoLocator');

var LocationSelectorCtrl = function ($scope, GeocodeFactory) {

    var handleResult = function (en, e, args, json) {
        var address = new Address();
        address.initFromGeocoder(json);
        $scope.locationSelectorCtrl.eventHandler(en, e, args, address);
        $scope.loc = address.formattedGPSLocation();
    };

    var geoLocator = new GeoLocator();

    var address = $scope.locationSelectorCtrl.mapModel.address;

    if (address.isVerified) {
        $scope.loc = address.formattedGPSLocation();
    } else {
        $scope.loc = 'Waiting...';
    }


    $scope.eventHandler = function (en, e, args) {
        var type = args.leafletEvent.type;
        if (type === 'dragend') GeocodeFactory.reverse(args.model)
            .then(function (json) {
                handleResult(en, e, args, json);
            });
    };

    $scope.search = function () {
        var text = $scope.searchText;
        if (text.length > 2) GeocodeFactory.geocode(text)
            .then(function (json) {
                handleResult(undefined, undefined, undefined, json);
            });
    };

    $scope.useCurrent = function () {
        geoLocator.locate()
            .then(function (location) {
                console.log(location);
            })
            .catch(function (err) {
                console.log(err);
            })
    };

};

LocationSelectorCtrl.$inject = ['$scope', 'GeocodeFactory'];
module.exports = LocationSelectorCtrl;