'use strict';

function projectImagesDirective() {
    return {
        controller: 'ProjectImagesCtrl',
        controllerAs: 'projectImagesCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project-images.html')
    };
}

module.exports = projectImagesDirective;