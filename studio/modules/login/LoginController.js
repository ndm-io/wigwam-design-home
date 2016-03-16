'use strict';

function LoginCtrl($scope, $rootScope, AuthService, AUTH_EVENTS, $state) {
    var vm = $scope,
        status = 'waiting';

    vm.credentials = {
        user: ''
    };

    vm.submit = function (credentials) {
        AuthService.sendToken(credentials)
            .then(function (response) {
                //TODO change state
                console.log('login ctrl success change state', response);
            }, function (err) {
                console.log('login ctrl error', err);
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                status = 'error';
            });
    };

    vm.showAlert = function () {
        return (status === 'error');
    };
}

LoginCtrl.$inject = ['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS', '$state'];
module.exports = LoginCtrl;