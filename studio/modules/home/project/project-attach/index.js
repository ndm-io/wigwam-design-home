'use strict';

module.exports = angular.module('modules.home.project.attach', [
        require('./attach-tile').name
    ])
    .directive('projectAttachView', require('./projectAttachDirective'))
    .controller('ProjectAttachCtrl', require('./ProjectAttachController'));