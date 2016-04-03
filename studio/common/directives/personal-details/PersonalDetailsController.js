'use strict';



var PersonalDetailsCtrl = function ($scope, SessionService, CommsFactory) {

    var vm = $scope;
    vm.user = SessionService.user;

    vm.preferred = function (type) {
        return (vm.user.profile.preferredContact === type) ? 'input-focused' : '';
    };

    vm.submitForm = function () {
        CommsFactory.updateProfile(vm.user.profile);
    };


};

PersonalDetailsCtrl.$inject = ['$scope', 'SessionService', 'CommsFactory'];
module.exports = PersonalDetailsCtrl;