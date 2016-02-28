'use strict';

var LogoutController = function (AuthService) {
    AuthService.logout();
};

LogoutController.$inject = ['AuthService'];
module.exports = LogoutController;