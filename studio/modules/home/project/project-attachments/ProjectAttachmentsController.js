'use strict';


function ProjectAttachmentsController($scope, DataFactory) {


    $scope.options = {
        fieldMapping: {
            title: 'name',
            description: 'note',
            img_thumb: 'thumbnailUri',
            img_full: 'fullUrl'
        }
    };

    Object.defineProperty($scope, 'images', {
        get: function () {
            return $scope.project.attachments;
        }
    });
}

ProjectAttachmentsController.$inject = ['$scope', 'DataFactory'];
module.exports = ProjectAttachmentsController;