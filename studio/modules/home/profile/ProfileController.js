'use strict';

var ProfileCtrl = function ($scope, SessionService, CommsFactory, leafletMarkerEvents) {

    var vm = $scope;
    vm.user = SessionService.user;

    CommsFactory.ukChart()
        .then(function (response) {
            vm.mapOutline = response;
        });

    vm.mapModel = {
        center: {
            lat: 51.505,
            lng: -0.09,
            zoom: 8
        },
        markers: {
            london: {
                lat: 51.505,
                lng: -0.09,
                draggable: true,
            }
        },
        events: {
            markers: {
                enable: leafletMarkerEvents.getAvailableEvents()
            }
        },
        loc: ':',
        height: '200px'
    };

    vm.handle = function (evt, args) {
        console.log(evt, args);
    }

};

ProfileCtrl.$inject = ['$scope', 'SessionService', 'CommsFactory', 'leafletMarkerEvents'];
module.exports = ProfileCtrl;