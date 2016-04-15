'use strict';

var items = require('./items');

function ProjectDesignbriefController ($scope) {
    $scope.items = items;
}

ProjectDesignbriefController.$inject = ['$scope'];
module.exports = ProjectDesignbriefController;