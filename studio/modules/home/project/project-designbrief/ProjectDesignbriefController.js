'use strict';

var items = require('../../../../common/models/DesignbriefItems').items;

function ProjectDesignbriefController ($scope, DataFactory) {

    var _projectGuid = $scope.project.guid;

    $scope.items = items;

    Object.defineProperty($scope, 'brief', {
        get: function () {
            return DataFactory.project.brief.briefWithProjectGuid(_projectGuid);
        }
    });

    $scope.select = function (item, option) {
        if ($scope.brief && !$scope.brief.locked) {
            DataFactory.project.brief.updateBrief(_projectGuid, $scope.brief.guid, item, option);
        }
    };

    $scope.isSelectedClass = function (item, option) {
        if (!$scope.brief) return '';
        return ($scope.brief.isSelected(item, option)) ? 'option-row-selected' : '';
    };

    $scope.isSelectable = function () {
        if (!$scope.brief) return '';
        return ($scope.brief.locked) ? '' : 'option-row-selectable';
    };

    $scope.lock = function () {
        DataFactory.project.brief.lockBrief(_projectGuid, $scope.brief.guid)
    };

    $scope.newBrief = function () {
        DataFactory.project.brief.newBriefWithProjectGuid(_projectGuid);
    };

}

ProjectDesignbriefController.$inject = ['$scope', 'DataFactory'];
module.exports = ProjectDesignbriefController;