'use strict';
function MainCtrl($scope, USER_ROLES, AuthService, SessionService, $state, $timeout) {
    var vm = $scope;


    vm.userRoles = USER_ROLES;
    vm.isAuthorized = AuthService.isAuthorized;

    vm.currentUser = function () {
        return SessionService.user;
    };

    vm.logout = function () {
        $state.go('logout');
    };

    SessionService.onReady()
        .then(function (user) {
            $timeout(function () {
                $state.go(user.settings.startState);
            });
        });

    SessionService.onReady(function (user) {
        console.log('fn version', user);
    });
}

MainCtrl.$inject = ['$scope', 'USER_ROLES', 'AuthService', 'SessionService', '$state', '$timeout'];
module.exports = MainCtrl;
