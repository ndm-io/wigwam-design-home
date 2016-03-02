module.exports = angular.module('common.directives.calendarWidget', [])
    .directive('calendarWidget', require('./calendarWidgetDirective'))
    .controller('CalendarWidgetCtrl', require('./CalendarWidgetController'));