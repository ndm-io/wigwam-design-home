'use strict';

var HeaderCtrl = function ($scope, MetricFactory) {

    $scope.unreadMessages = function () {
        return MetricFactory.unreadMessages();
    };
};

HeaderCtrl.$inject = ['$scope', 'MetricFactory'];
module.exports = HeaderCtrl;