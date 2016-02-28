'use strict';

module.exports = function profileDirective() {
    return {
        controller: 'ProfileCtrl',
        controllerAs: 'profileCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./profile.html')
    }
};