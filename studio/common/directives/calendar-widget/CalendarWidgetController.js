'use strict';

var $ = require('jquery'),
    CONSTS = require('../EventConsts');

var CalendarWidgetCtrl = function ($scope, DataFactory, $rootScope) {

    $scope.events = DataFactory.events.allEvents;

    var eventRender = function () {
        return $('<td>').css('background-color', 'rgba(5,5,5,0.5)');
    };

    var dayClick = function (date) {
        $rootScope.$broadcast(CONSTS.calendarChangeDay, date);
    };


    $scope.uiConfig = {
        calendar: {
            editable: false,
            eventRender: eventRender,
            dayClick: dayClick
        }
    };

    $scope.eventSources = [$scope.events];

};

CalendarWidgetCtrl.$inject = ['$scope', 'DataFactory', '$rootScope'];
module.exports = CalendarWidgetCtrl;