module.exports = angular.module('modules.home.calendar', [])
    .directive('calendarView', require('./calendarDirective'))
    .controller('CalendarCtrl', require('./CalendarController'));