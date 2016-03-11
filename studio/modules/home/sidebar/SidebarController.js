'use strict';

var SidebarCtrl = function ($scope, SessionService) {

    // Side bar

    var vm = $scope,
        _profileOpen = false;

    vm.ss = SessionService;

    vm.gravatar = vm.ss.user.gravatar();

    vm.profileOpen = function () {
        return (_profileOpen) ? 'open' : '';
    };

    vm.toggleProfileOpen = function () {
        _profileOpen = !_profileOpen;
    }
};

SidebarCtrl.$inject = ['$scope', 'SessionService'];
module.exports = SidebarCtrl;