'use strict';

function projectAttachmentsDirective() {
    return {
        controller: 'ProjectAttachmentsCtrl',
        controllerAs: 'projectAttachmentsCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project-attachments.html')
    };
}

module.exports = projectAttachmentsDirective;