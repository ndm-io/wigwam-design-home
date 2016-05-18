'use strict';

var $ = require('jquery');

var CalendarWidgetCtrl = function ($scope, DataFactory) {

    $scope.events = DataFactory.events.allEvents;

    var eventRender = function () {
        return $('<td>').css('background-color', 'rgba(5,5,5,0.5)');
    };


    $scope.uiConfig = {
        calendar: {
            editable: false,
            eventRender: eventRender
        }
    };

    $scope.eventSources = [$scope.events];

};

CalendarWidgetCtrl.$inject = ['$scope', 'DataFactory'];
module.exports = CalendarWidgetCtrl;