'use strict';

var CalendarController = function ($scope, DataFactory, uiCalendarConfig) {

    $scope.events = DataFactory.events.allEvents;

    var eventRender = function (event, element, view) {
        element.addClass('fc-event-admin');
    };

    var eventDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log('event',event, $scope.events);
    };

    var eventResize = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log('resize', event);
    };


    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            timeFormat: 'H:mm',
            eventRender: eventRender,
            eventDrop: eventDrop,
            eventResize: eventResize
        }
    };

    $scope.eventSources = [$scope.events];

    $scope.changeView = function (calendar, view) {
        console.log('change to ', view);
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

};

CalendarController.$inject = ['$scope', 'DataFactory', 'uiCalendarConfig'];
module.exports = CalendarController;