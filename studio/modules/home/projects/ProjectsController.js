'use strict';

var ProjectFactory = require('../../../common/models/factories/ProjectFactory');

var ProjectsController = function ($scope, DataFactory) {

    Object.defineProperty($scope, 'chats', {
        get: function () {
            return DataFactory.chat.chats();
        }
    });

    Object.defineProperty($scope, 'projects', {
        get: function () {
            return DataFactory.project.projects();
        }
    });

    Object.defineProperty($scope, 'colClass', {
        get: function () {
            return ($scope.chats.length > 0) ? 'col-md-9' : 'col-md-12';
        }
    });

};

ProjectsController.$inject = ['$scope', 'DataFactory'];
module.exports = ProjectsController;