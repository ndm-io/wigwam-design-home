'use strict';

var PersonalDetailsCtrl = function ($scope, SessionService, CommsFactory) {

    var vm = $scope;
    vm.user = SessionService.user;

    vm.submitForm = function () {
        CommsFactory.updateProfile(vm.user.profileForUpload());
    };

};

PersonalDetailsCtrl.$inject = ['$scope', 'SessionService', 'CommsFactory'];
module.exports = PersonalDetailsCtrl;