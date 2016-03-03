'use strict';

var ProfileCtrl = function ($scope, SessionService, CommsFactory, leafletMarkerEvents) {

    var vm = $scope;
    vm.user = SessionService.user;

    console.log(vm.user);

    CommsFactory.ukChart()
        .then(function (response) {
            vm.mapOutline = response;
        });

    var center = function () {
        if (vm.user.hasVerifiedAddress()) {
            var marker = vm.user.address.marker();
            marker.draggable = true;
            marker.message = 'Default Location';
            return marker;
        }
        return {
            autoDiscover: true
        }
    };


    vm.mapModel = {
        center: center(),
        markers:vm.user.address.loc.marker(),
        events: {
            markers: {
                enable: leafletMarkerEvents.getAvailableEvents()
            }
        },
        loc: ':',
        height: '200px',
        address: vm.user.address
    };

    vm.handle = function (eventName, e, args, address) {
        if (address) {
            console.log('update profile with new address', address);
        }
    };

};

ProfileCtrl.$inject = ['$scope', 'SessionService', 'CommsFactory', 'leafletMarkerEvents'];
module.exports = ProfileCtrl;