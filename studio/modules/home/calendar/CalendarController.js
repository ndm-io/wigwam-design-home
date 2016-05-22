'use strict';

var CONSTS = require('../../../common/directives/EventConsts'),
    _ = require('lodash');

var CalendarController = function ($scope, DataFactory, uiCalendarConfig, $uibModal) {

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
            uiCalendarConfig.calendars[mainCalendar].fullCalendar('refetchEvents');

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
            //viewRender: viewRender,
            dayClick: dayClick
        }
    };

    $scope.eventSources = [DataFactory.events.eventSource];

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