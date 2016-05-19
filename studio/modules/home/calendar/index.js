module.exports = angular.module('modules.home.calendar', [
        require('./AddEventModal').name
    ])
    .directive('calendarView', require('./calendarDirective'))
    .controller('CalendarCtrl', require('./CalendarController'));