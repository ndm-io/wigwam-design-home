'use strict';

module.exports = function logoutDirective() {
    return {
        controller: 'LogoutCtrl',
        controllerAs: 'logoutCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./logout.html')
    };
};