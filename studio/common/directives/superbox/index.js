'use strict';

module.exports = angular.module('common.directives.superbox', [])
    .directive('superbox', require('./superboxDirective'))
    .controller('SuperboxCtrl', require('./SuperboxController'));