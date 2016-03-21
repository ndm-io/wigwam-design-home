'use strict';

var Messages = require('./login-messages');
var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function LoginCtrl($scope, AuthService) {
    var vm = $scope,
        msgs = Messages;

    vm.credentials = {
        user: ''
    };

    vm.log = msgs.info;

    vm.submit = function (credentials) {
        if (!emailRe.test(credentials.user)) {
            vm.message = msgs.invalid;
            vm.state = 'invalid';
            return;
        }

        vm.log = msgs.sending;
        AuthService.sendToken(credentials)
            .then(function () {
                vm.log = msgs.success;
                vm.credentials.user = '';
            }, function () {
                vm.log = msgs.error;
            });
    };
}

LoginCtrl.$inject = ['$scope', 'AuthService'];
module.exports = LoginCtrl;