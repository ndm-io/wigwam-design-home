'use strict';

var HeaderCtrl = function ($scope, MetricFactory, $rootScope) {

    $scope.unreadMessages = function () {
        return MetricFactory.unreadMessages();
    };

    $scope.loading = function () {
        return $rootScope.loading;
    };
};

HeaderCtrl.$inject = ['$scope', 'MetricFactory', '$rootScope'];
module.exports = HeaderCtrl;