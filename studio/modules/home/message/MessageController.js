'use strict';

var MessageController = function ($scope, $stateParams) {
    var vm = $scope;

    vm.message = $stateParams.message;

    vm.html = vm.message.html();

};

MessageController.$inject = ['$scope', '$stateParams'];
module.exports = MessageController;