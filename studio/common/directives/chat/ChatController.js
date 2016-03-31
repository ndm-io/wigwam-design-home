'use strict';

var Message = require('../../models/Message');

var NewMessage = function (text, user) {
    var message = new Message();
    message.html(text);
    message.setCreatedByUser(user);
    return message;
};

function ChatController($scope, DataFactory, SessionService) {


    var sendOnReturn = true;
    $scope.toggleSendOnReturn = function (value) {
        sendOnReturn = value;
    };

    $scope.leaveRoom = function (model) {
        DataFactory.leaveRoom(model.name);
    };

    $scope.clearText = function () {
        $scope.textarea = '';
    };

    $scope.$watch('chatModel.messages', function (nv) {
        $scope.animateContainer();
    }, true);

    $scope.addToMessages = function (message) {
        DataFactory.addMessage($scope.chatModel, message);
        $scope.clearText();
    };

    $scope.fromMe = function (message) {
        return (message.isFrom(SessionService.user)) ? "my-message" : "your-message";
    };

    $scope.send = function () {
        var message = NewMessage($scope.textarea, SessionService.user);
        $scope.addToMessages(message);
    };

    var hasSentUpdate = false;

    $scope.isTyping = function (room) {
        return DataFactory.isTyping(room);
    };

    $scope.typing = function (room) {

        var data = {room: room, user: SessionService.user};
        if (!$scope.textarea || $scope.textarea.length === 0) {
            DataFactory.stopTyping(data);
            hasSentUpdate = false;
        } else {
            if (!hasSentUpdate) {
                DataFactory.roomIsTyping(data);
                hasSentUpdate = true;
            }
        }

        $scope.animateContainer();

    };

}

ChatController.$inject = ['$scope', 'DataFactory', 'SessionService'];
module.exports = ChatController;