'use strict';

var _ = require('lodash');

var HomeMessagesController = function ($scope, DataFactory, MetricFactory) {

    var vm = $scope;

    vm.projects = undefined;

    DataFactory.projects()
        .then(function (projects) {
           vm.projects = projects;
        });

    vm.refresh = function () {
        console.log(vm.projects);
    };

    vm.totalMessageCount = function () {
       return MetricFactory.totalMessages();
    };

};

HomeMessagesController.$inject = ['$scope', 'DataFactory', 'MetricFactory'];
module.exports = HomeMessagesController;