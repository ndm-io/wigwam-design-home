'use strict';

function projectLocationDirective() {
    return {
        controller: 'ProjectLocationCtrl',
        controllerAs: 'projectLocationCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project-location.html')
    };
}

module.exports = projectLocationDirective;