'use strict';

module.exports = angular.module('modules.logout', [])
    .directive('logoutView', require('./logoutDirective'))
    .controller('LogoutCtrl', require('./LogoutController'))
    .config(require('./logoutRoutes'));