'use strict';

var WWFile = require('../../../../../common/models/WWFile'),
    _ = require('lodash');


function ProjectAttachTileController($scope, $timeout, DataFactory) {

    $scope.files = undefined;
    $scope.progress = 0;

    $scope.fileChange = function (files) {
        $timeout(function () {

            $scope.files = _.map(files, function (file) {
                return new WWFile(file, function () {
                    $scope.$apply();
                });
            });

        }, 0);
    };

    $scope.send = function () {
        DataFactory.project.attachment.attachmentsForProjectGuid($scope.files, $scope.project.guid);
    };
}

ProjectAttachTileController.$inject = ['$scope', '$timeout', 'DataFactory'];
module.exports = ProjectAttachTileController;