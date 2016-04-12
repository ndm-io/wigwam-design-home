'use strict';

module.exports = angular.module('modules.home.project.summary', [])
    .directive('projectSummaryView', require('./projectSummaryDirective'))
    .controller('ProjectSummaryCtrl', require('./ProjectSummaryController'));