'use strict';

var CalendarController = function ($scope) {
    var vm = $scope;

    vm.upComingEvents = [
        {
            title:'This is an event'
        },
        {
            title:'This is event 2'
        }
    ];

};

CalendarController.$inject = ['$scope'];
module.exports = CalendarController;