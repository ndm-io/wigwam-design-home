module.exports = angular.module('common.directives.clockWidget', [])
    .directive('clockWidget', require('./clockWidgetDirective'))
    .controller('ClockWidgetCtrl', require('./ClockWidgetController'));