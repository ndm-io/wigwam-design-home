'use strict';
// Wigwam
module.exports = angular.module('modules.pages.wigwam', [])
    .directive('wigwamView', require('./wigwamDirective'))
    .controller('WigwamCtrl', require('./WigwamController'));