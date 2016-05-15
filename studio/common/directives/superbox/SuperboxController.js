'use strict';

var Thumbnailer = require('../../models/Thumbnailer');

function SuperboxController ($scope, DataFactory, $timeout) {
    $scope.remove = function (attachmentGuid) {
        DataFactory.project.attachment.removeAttachmentForProjectGuid(attachmentGuid, $scope.project.guid);
        $timeout(function () {
            $scope.$apply();
            $scope.refreshSuperbox();
        }, 0);

    };
}

SuperboxController.$inject = ['$scope', 'DataFactory', '$timeout'];
module.exports = SuperboxController;