'use strict';

function LoginCtrl($scope, $rootScope, AuthService, AUTH_EVENTS) {
    var vm = $scope,
        box = 'login';

    vm.credentials = {
        email: '',
        password: ''
    };

    vm.active = function (type) {
        return (type === box) ? 'active' : '';
    };

    vm.setBox = function (type) {
        box = type;
    };

    vm.submit = function (credentials) {
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
}

LoginCtrl.$inject = ['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS'];
module.exports = LoginCtrl;