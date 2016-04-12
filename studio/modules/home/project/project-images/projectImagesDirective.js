'use strict';

function projectSummaryDirective() {
    return {
        controller: 'ProjectSummaryCtrl',
        controllerAs: 'projectSummaryCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project-summary.html')
    };
}

module.exports = projectSummaryDirective;