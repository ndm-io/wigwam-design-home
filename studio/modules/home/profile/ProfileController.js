'use strict';

var ProfileCtrl = function ($scope, SessionService, CommsFactory) {

    var vm = $scope;
    vm.user = SessionService.user;

    CommsFactory.ukChart()
        .then(function (response) {
            vm.mapOutline = response;
        });

};

ProfileCtrl.$inject = ['$scope', 'SessionService', 'CommsFactory'];
module.exports = ProfileCtrl;