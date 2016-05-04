'use strict';

//var MapModel = require('../../../common/models/MapModel'),
    var Helper = require('./ProjectControllerHelper');

var ProjectController = function ($scope, SessionService, $stateParams, DataFactory) {

    var helper = Helper(DataFactory, SessionService.user);
    var _projectGuid = helper.projectGuidFromParams($stateParams);
    var factory = DataFactory.project;

    Object.defineProperty($scope, 'project', {
        get: function () {
            return factory.projectWithGuid(_projectGuid);
        }
    });

    Object.defineProperty($scope, 'chats', {
        get: function () {
            return DataFactory.chat.chats();
        }
    });

    $scope.mainColWidth = function () {
        return ($scope.chats.length > 0) ? 'col-md-9' : 'col-md-12';
    };


};

ProjectController.$inject = ['$scope', 'SessionService', '$stateParams', 'DataFactory'];
module.exports = ProjectController;