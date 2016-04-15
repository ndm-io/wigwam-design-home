'use strict';

function projectDesignbriefDirective() {
    return {
        controller: 'ProjectDesignbriefCtrl',
        controllerAs: 'projectDesignbriefCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project-designbrief.html')
    };
}

module.exports = projectDesignbriefDirective;