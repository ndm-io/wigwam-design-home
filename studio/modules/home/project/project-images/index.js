'use strict';

module.exports = angular.module('modules.home.project.images', [])
    .directive('projectImagesView', require('./projectImagesDirective'))
    .controller('ProjectImagesCtrl', require('./ProjectImagesController'));