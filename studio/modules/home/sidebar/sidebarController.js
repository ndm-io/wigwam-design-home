'use strict';

var SidebarCtrl = function ($scope, SessionService) {


    var vm = $scope,
        _profileOpen = false;

    vm.user = SessionService.user;

    vm.profileOpen = function () {
        return (_profileOpen) ? 'open' : '';
    };

    vm.toggleProfileOpen = function () {
        _profileOpen = !_profileOpen;
    }
};

SidebarCtrl.$inject = ['$scope', 'SessionService'];
module.exports = SidebarCtrl;