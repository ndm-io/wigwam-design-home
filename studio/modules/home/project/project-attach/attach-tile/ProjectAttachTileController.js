'use strict';

var File = require('../../../../../common/models/WWFile'),
    _ = require('lodash');


function ProjectAttachTileController($scope, $timeout) {

    $scope.files = undefined;
    $scope.progress = 0;

    $scope.fileChange = function (files) {
        $timeout(function () {
            $scope.files = _.map(files, function (file) {
                var f = new File(file);
                f.onload = function () {
                    $scope.$apply();
                };
                return f;
            });
        }, 0);
    };
}

ProjectAttachTileController.$inject = ['$scope', '$timeout'];
module.exports = ProjectAttachTileController;