'use strict';

var CONSTS = require('../../../common/directives/EventConsts'),
    _ = require('lodash');

var CalendarController = function ($scope, DataFactory, uiCalendarConfig, $uibModal) {

    //$scope.events = DataFactory.events.allEvents;

    var month = new Date().getMonth();
    $scope.viewedEvents = _.filter($scope.events, function (event) {
            return (event.start.getMonth() === month);
        });

    var mainCalendar = 'mainCalendar';

    var eventClick = function (event) {
        // todo if has a project... go to it
    };

    var eventRender = function (event, element, view) {
        element.addClass('fc-event-admin');
    };

    var eventDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log('event', event, $scope.events);
    };

    var eventResize = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log('resize', event);
    };

    var viewRender = function () {
        var evts = uiCalendarConfig.calendars[mainCalendar].fullCalendar('clientEvents', filter(mainCalendar));
        if (evts && evts.length > 0) {
            $scope.viewedEvents = evts;
        }
    };

    var dayClick = function (date) {
        var modalInstance = $uibModal.open({
            animation: true,
            template: require('./AddEventModal/add-event-modal.html'),
            controller: 'AddEventCtrl',
            size: 'md',
            resolve: {
                date: function () {
                    return date;
                },
                projects: function () {
                    return $scope.projects;
                }
            }
        });

        modalInstance.result.then(function (newEvent) {
            DataFactory.events.addEventToProjectGuid(newEvent.projectGuid, newEvent);
            console.log($scope.projects);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            timeFormat: 'H:mm',
            eventClick: eventClick,
            eventRender: eventRender,
            eventDrop: eventDrop,
            eventResize: eventResize,
            viewRender: viewRender,
            dayClick: dayClick
        }
    };

    $scope.eventSources = [DataFactory.events.allEvents];

    var filter = function (calendar) {
        var view = uiCalendarConfig.calendars[calendar].fullCalendar('getView');
        var start = view.visStart;
        var end   = view.visEnd;
        return function (e) {
            return (e.start >= start && e.start <= end)
        };
    };

    $scope.changeView = function (calendar, view) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
    };

    $scope.$on(CONSTS.calendarChangeDay, function (event, date) {
        uiCalendarConfig.calendars[mainCalendar].fullCalendar('gotoDate', date)
    });

    Object.defineProperty($scope, 'projects', {
        get: function () {
            return DataFactory.project.projects();
        }
    });



};

CalendarController.$inject = ['$scope', 'DataFactory', 'uiCalendarConfig', '$uibModal'];
module.exports = CalendarController;