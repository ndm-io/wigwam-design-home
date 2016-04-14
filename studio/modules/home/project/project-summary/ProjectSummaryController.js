'use strict';

var MapModel = require('../../../../common/models/MapModel');

function ProjectSummaryController($scope, leafletMarkerEvents, DataFactory) {

    var dataFactory = DataFactory.project,
        _projectGuid;

    $scope.$watch('project', function () {
        if ($scope.project) {
            _projectGuid = $scope.project.guid;
            $scope.mapModel = MapModel($scope.project, leafletMarkerEvents);
        }
    });

    $scope.$watch('project.address', function (addr) {
        if ($scope.mapModel && addr) $scope.mapModel.updateFromAddress(addr);
    });

    $scope.handle = function (eventName, e, args, address) {
        dataFactory.updateProjectAddress(_projectGuid, address);
    };

    $scope.save = function () {
        dataFactory.updateProjectWithKeys(_projectGuid, ['name', 'description']);
    };

}

ProjectSummaryController.$inject = ['$scope', 'leafletMarkerEvents', 'DataFactory'];
module.exports = ProjectSummaryController;