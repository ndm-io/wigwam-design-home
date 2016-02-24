'use strict';

module.exports = function wigwamDirective() {
    return {
        controller: 'WigwamCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./wigwam.html')
    };
};