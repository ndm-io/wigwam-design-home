'use strict';

var MapModel = require('../../../common/models/MapModel');

var ProfileCtrl = function ($scope, SessionService, CommsFactory, leafletMarkerEvents) {

    var vm = $scope;
    vm.user = SessionService.user;

    CommsFactory.ukChart()
        .then(function (response) {
            vm.mapOutline = response;
        });

    vm.mapModel = MapModel(vm.user, leafletMarkerEvents);
    vm.gravatar = vm.user.gravatar();

    vm.handle = function (eventName, e, args, address) {
        if (address) {
            CommsFactory.updateAddress(address)
                .then(function (data) {
                    console.log(data);
                });
        }
    };

};

ProfileCtrl.$inject = ['$scope', 'SessionService', 'CommsFactory', 'leafletMarkerEvents'];
module.exports = ProfileCtrl;