'use strict';

var Thumbnailer = require('../../../../common/models/Thumbnailer');


function ProjectAttachmentsController($scope) {

    $scope.urlCache = {};

    $scope.fullUrlForAttachment = function (attachment) {
        if (!$scope.urlCache[attachment.guid]) {

            $scope.urlCache[attachment.guid] = {
                sent: true,
                url: ''
            };

            Thumbnailer.uncompressedBase64WithUint8Array(attachment.bytes(), attachment.type)
                .then(function (url) {
                    $scope.urlCache[attachment.guid].url = url;
                    console.log('set url cache', url);
                })
                .catch(function (err) {
                    console.log('project att ctrl', err);
                });

        }
        return $scope.urlCache[attachment.guid].url;
    };

}

ProjectAttachmentsController.$inject = ['$scope'];
module.exports = ProjectAttachmentsController;