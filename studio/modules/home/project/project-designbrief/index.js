'use strict';

module.exports = angular.module('modules.home.project.designbrief', [])
    .directive('projectDesignbriefView', require('./projectDesignbriefDirective'))
    .controller('ProjectDesignbriefCtrl', require('./ProjectDesignbriefController'));