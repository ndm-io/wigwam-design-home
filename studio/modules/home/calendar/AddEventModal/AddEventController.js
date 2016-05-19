'use strict';

function AddEventController($scope, $uibModalInstance, date, projects) {

    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var h = new Date().getHours();

    var start = new Date(y, m, d);
    start.setHours(h);

    var end = new Date(y, m, d);
    end.setHours(h + 1);

    $scope.newEvent = {
        start: start,
        end: end,
        title: '',
        projectGuid: projects[0].guid,
        editable: true,
        allDay: false
    };

    $scope.projects = projects;

    var selectedProjectGuid = projects[0];

    $scope.classForProject = function (project) {
        return (selectedProjectGuid === project.guid) ? 'calendar-add-event-project-selected' : '';
    };

    $scope.choose = function (project) {
        $scope.newEvent.projectGuid = project.guid;
        selectedProjectGuid = project.guid;
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.newEvent);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

// AddEventController.$inject = ['$scope', 'DataFactory', '$uibModalInstance'];
module.exports = AddEventController;