'use strict';

var LogoutController = function (AuthService) {
    AuthService.logout()
        .then(function (res) {
            console.log('logged out');
        });
};

LogoutController.$inject = ['AuthService'];
module.exports = LogoutController;