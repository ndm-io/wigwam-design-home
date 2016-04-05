'use strict';

module.exports = function usersDirective () {
    return {
        controller: 'UsersCtrl',
        controllerAs: 'usersCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./users.html')
    };
};