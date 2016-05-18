'use strict';


var calendarWidgetDirective = function () {
    return {
        controller: 'CalendarWidgetCtrl',
        controllerAs: 'calendarWidgetCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./calendar-widget.html')
    };
};

module.exports = calendarWidgetDirective;