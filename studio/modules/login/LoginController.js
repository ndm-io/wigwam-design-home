'use strict';

function LoginCtrl($scope, $rootScope, AuthService, AUTH_EVENTS, $state) {
    var vm = $scope,
        box = 'login',
        status = 'waiting';

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
            $state.go('home');
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            status = 'error';
        });
    };

    vm.showAlert = function () {
        return (status === 'error');
    }
}

LoginCtrl.$inject = ['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS', '$state'];
module.exports = LoginCtrl;