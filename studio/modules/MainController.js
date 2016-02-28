'use strict';
function MainCtrl($scope, USER_ROLES, AuthService, SessionService, $state) {
    var vm = $scope;


    vm.userRoles = USER_ROLES;
    vm.isAuthorized = AuthService.isAuthorized;

    vm.currentUser = function () {
        return SessionService.user;
    };

    vm.logout = function () {
        $state.go('logout');
    };

    $state.transitionTo('home.dash');

}

MainCtrl.$inject = ['$scope', 'USER_ROLES', 'AuthService', 'SessionService', '$state'];
module.exports = MainCtrl;
