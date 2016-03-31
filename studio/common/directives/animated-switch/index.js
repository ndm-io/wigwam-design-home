'use strict';

module.exports = angular.module('common.directives.animatedSwitch', [])
    .directive('animatedSwitch', require('./animatedSwitchDirective'))
    .controller('AnimatedSwitchCtrl', require('./AnimatedSwitchController'));