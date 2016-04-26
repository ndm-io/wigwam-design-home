'use strict';

module.exports = angular.module('modules.home.project.attach.tile', [
        require('./input-file-change').name
    ])
    .directive('projectAttachTileView', require('./projectAttachTileDirective'))
    .controller('ProjectAttachTileCtrl', require('./ProjectAttachTileController'));