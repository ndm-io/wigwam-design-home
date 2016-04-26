'use strict';

function projectAttachDirective() {
    return {
        controller: 'ProjectAttachCtrl',
        controllerAs: 'projectAttachCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project-attach.html')
    };
}

module.exports = projectAttachDirective;