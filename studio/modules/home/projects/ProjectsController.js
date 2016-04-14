'use strict';

var ProjectFactory = require('../../../common/models/factories/ProjectFactory');

var ProjectsController = function ($scope, DataFactory) {

    $scope.__defineGetter__('chats', function () {
        return DataFactory.chat.chats();
    });

    $scope.__defineGetter__('projects', function () {
        return DataFactory.project.projects();
    });

    $scope.__defineGetter__('colClass', function () {
        return ($scope.chats.length > 0) ? 'col-md-9' : 'col-md-12';
    });
};

ProjectsController.$inject = ['$scope', 'DataFactory'];
module.exports = ProjectsController;