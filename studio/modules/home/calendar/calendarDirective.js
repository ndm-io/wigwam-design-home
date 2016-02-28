'use strict';

module.exports = function calendarDirective () {
    return {
        controller: 'CalendarCtrl',
        controllerAs: 'calendarCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./calendar.html')
    }
};