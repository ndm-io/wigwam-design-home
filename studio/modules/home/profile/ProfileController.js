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

    vm.handle = function (eventName, e, args, address) {
        if (address) {
            console.log('profile new address', address);
        }
    };

};

ProfileCtrl.$inject = ['$scope', 'SessionService', 'CommsFactory', 'leafletMarkerEvents'];
module.exports = ProfileCtrl;