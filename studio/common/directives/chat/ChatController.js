'use strict';

var Message = require('../../models/Message');

var NewMessage = function (text, user) {
    var message = new Message();
    message.html(text);
    message.setCreatedByUser(user);
    return message;
};

function ChatController($scope, DataFactory, SessionService) {
    $scope.leaveRoom = function (model) {
        DataFactory.leaveRoom(model.name);
    };

    $scope.clearText = function () {
        $scope.text = '';
    };

    $scope.$watch('chatModel.messages', function (nv) {
        $scope.animateContainer();
    }, true);

    $scope.addToMessages = function (message) {
        DataFactory.addMessage($scope.chatModel, message);
        $scope.clearText();
    };

    $scope.send = function (text, event) {
        if (!event || event.charCode === 13) {

            var message = NewMessage(text, SessionService.user);
            $scope.addToMessages(message);

        }
    };

}

ChatController.$inject = ['$scope', 'DataFactory', 'SessionService'];
module.exports = ChatController;