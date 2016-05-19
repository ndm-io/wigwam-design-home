'use strict';

function AddEventController ($scope, $uibModalInstance, date, projects) {

    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var start = new Date(y, m, d);


    var end = new Date(y, m, d);

    $scope.newEvent = {
        start: start,
        end: end,
        title: '',
        projectGuid: undefined,
        editable: true,
        allDay: false
    };

    $scope.projects = projects;

    $scope.ok = function () {
        $uibModalInstance.close($scope.newEvent);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

// AddEventController.$inject = ['$scope', 'DataFactory', '$uibModalInstance'];
module.exports = AddEventController;