'use strict';

var CalendarWidgetCtrl = function ($scope) {

    var vm = $scope;

    vm.view = function (type) {
       vm.el.fullCalendar('changeView', type);
    }

};

CalendarWidgetCtrl.$inject = ['$scope'];
module.exports = CalendarWidgetCtrl;