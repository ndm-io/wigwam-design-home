'use strict';

var MapModel = require('../../../common/models/MapModel'),
    Helper = require('./ProjectControllerHelper');

var ProjectController = function ($scope, SessionService, $stateParams, DataFactory) {

    var helper = Helper(DataFactory, SessionService.user);
    var _projectGuid = helper.projectGuidFromParams($stateParams);
    var factory = DataFactory.project;

    $scope.__defineGetter__('project', function () {
        return factory.projectWithGuid(_projectGuid);
    });

};

ProjectController.$inject = ['$scope', 'SessionService', '$stateParams', 'DataFactory'];
module.exports = ProjectController;