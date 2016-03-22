'use strict';

function ChatController($scope, DataFactory) {
    $scope.leaveRoom = function (model) {
        DataFactory.leaveRoom(model.name);
    };
}

ChatController.$inject = ['$scope', 'DataFactory'];
module.exports = ChatController;