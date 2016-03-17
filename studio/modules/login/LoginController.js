'use strict';

var Messages = require('./login-messages');
var emailValidator = require('../../../server/modules/email-validator');

function LoginCtrl($scope, AuthService) {
    var vm = $scope,
        msgs = Messages;

    vm.credentials = {
        user: ''
    };

    vm.message = msgs.info;
    vm.state = 'waiting';

    vm.submit = function (credentials) {
        if (!emailValidator(credentials.user)) {
            vm.message = msgs.invalid;
            vm.state = 'invalid';
            return;
        }

        AuthService.sendToken(credentials)
            .then(function () {
                vm.message = msgs.success;
                vm.state = 'success';
                vm.credentials.user = '';
            }, function () {
                vm.message = msgs.error;
                vm.state = 'error';
            });
    };
}

LoginCtrl.$inject = ['$scope', 'AuthService'];
module.exports = LoginCtrl;