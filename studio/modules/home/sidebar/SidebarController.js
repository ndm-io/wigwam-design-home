'use strict';

var SidebarCtrl = function ($scope, $rootScope, SessionService) {

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
    };

    // Route Changes

    //$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
    //    console.log(toState);
    //});
};

SidebarCtrl.$inject = ['$scope', '$rootScope', 'SessionService'];
module.exports = SidebarCtrl;