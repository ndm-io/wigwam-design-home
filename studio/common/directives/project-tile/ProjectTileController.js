'use strict';

function ProjectTileController ($scope, DataFactory) {
    $scope.remove = function (project) {
        DataFactory.project.removeProjectWithGuid(project.guid);
    };
}

ProjectTileController.$inject = ['$scope', 'DataFactory'];
module.exports = ProjectTileController;