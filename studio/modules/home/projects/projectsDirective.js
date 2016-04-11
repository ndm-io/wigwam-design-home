'use strict';

module.exports = function projectsDirective () {
    return {
        controller: 'ProjectsCtrl',
        controllerAs: 'projectsCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./projects.html')
    };
};