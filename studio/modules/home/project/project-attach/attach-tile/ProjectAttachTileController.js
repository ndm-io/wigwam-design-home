'use strict';

var WWFile = require('../../../../../common/models/WWFile'),
    _ = require('lodash');


function ProjectAttachTileController($scope, $timeout) {

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
        console.log($scope.files);
    };
}

ProjectAttachTileController.$inject = ['$scope', '$timeout'];
module.exports = ProjectAttachTileController;