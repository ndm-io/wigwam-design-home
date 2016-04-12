'use strict';

module.exports = function projectDirective () {
    return {
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project.html')
    };
};