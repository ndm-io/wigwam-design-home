'use strict';

module.exports = angular.module('modules.home.project.location', [])
    .directive('projectLocationView', require('./projectLocationDirective'))
    .controller('ProjectLocationCtrl', require('./ProjectLocationController'));