'use strict';

function AddEventController($scope, $uibModalInstance, date, projects) {

    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var h = new Date().getHours();

    var start = new Date(y, m, d);
    start.setHours(h + 1);

    var end = new Date(y, m, d);
    end.setHours(h + 2);

    var defaultProjectGuid = function () {
        return projects[projects.length - 1].guid;
    };

    var selectedProjectGuid = defaultProjectGuid();

    $scope.newEvent = {
        start: start,
        end: end,
        title: '',
        projectGuid: defaultProjectGuid(),
        editable: true,
        allDay: false
    };

    $scope.projects = projects;

    $scope.title = function () {
        return (selectedProjectGuid) ? 'Add event to Project' : 'Select a project for this event';
    };

    $scope.changed = function () {
        var event = $scope.newEvent;
        if (event.start.getTime() > event.end.getTime()) {
            event.end.setHours(event.start.getHours() + 1);
            event.end = new Date(event.end);
        }
    };

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