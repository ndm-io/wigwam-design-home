'use strict';

var MapModel = require('../../../../common/models/MapModel');

function ProjectSummaryController ($scope, SessionService, leafletMarkerEvents) {
    $scope.mapModel = MapModel(SessionService.user, leafletMarkerEvents);

};

ProjectSummaryController.$inject = ['$scope', 'SessionService', 'leafletMarkerEvents'];
module.exports = ProjectSummaryController;