'use strict';

var MapModel = require('../../../../common/models/MapModel');

function ProjectSummaryController($scope, SessionService, leafletMarkerEvents, DataFactory, $stateParams) {

    var dataFactory = DataFactory.project,
        _projectGuid;

    $scope.$watch('project', function () {
        if ($scope.project) _projectGuid = $scope.project.guid;
    });

    $scope.mapModel = MapModel(SessionService.user, leafletMarkerEvents);
    $scope.handle = function (eventName, e, args, address, location) {
        dataFactory.updateProjectAddress(_projectGuid, address);
    };

}

ProjectSummaryController.$inject = ['$scope', 'SessionService', 'leafletMarkerEvents', 'DataFactory', '$stateParams'];
module.exports = ProjectSummaryController;