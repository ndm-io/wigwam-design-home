'use strict';

var _ = require('lodash');

var BreadcrumbController = function ($scope) {

   $scope.breadcrumbs = [];

    $scope.$on('$stateChangeSuccess', function (event, toState) {
        $scope.breadcrumbs = _(toState.name.split('.'))
            .map(function (name) {
                return {name: name.charAt(0).toUpperCase() + name.slice(1)};
            })
            .value();
    });

};

BreadcrumbController.$inject = ['$scope'];
module.exports = BreadcrumbController;