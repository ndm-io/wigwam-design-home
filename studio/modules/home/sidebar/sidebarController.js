'use strict';

var SidebarCtrl = function ($scope) {

    var vm = $scope,
        _profileOpen = false;

    vm.profileOpen = function () {
        return (_profileOpen) ? 'open' : '';
    };

    vm.toggleProfileOpen = function () {
        _profileOpen = !_profileOpen;
    }
};

SidebarCtrl.$inject = ['$scope'];
module.exports = SidebarCtrl;