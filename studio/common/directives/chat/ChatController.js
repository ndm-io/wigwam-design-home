'use strict';

var Message = require('../../models/Message'),
    MessageFactory = require('../../models/factories/MessageFactory'),
    sendKey = require('./chat-send-key');

function ChatController($scope, DataFactory, SessionService) {

    var sendOnReturn = true,
        hasSentUpdate = false;

    $scope.toggleSendOnReturn = function (value) {
        sendOnReturn = value;
    };

    $scope.leaveRoom = function (model) {
        DataFactory.leaveRoom(SessionService.user, model.name);
    };

    $scope.clearText = function () {
        $scope.textarea = '';
    };

    $scope.$watch('chatModel.messages', function () {

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
        hasSentUpdate = false;
        var message = MessageFactory.messageWithTextAndUser($scope.textarea, SessionService.user);
        $scope.addToMessages(message);
    };

    $scope.isTyping = function (room) {
        return DataFactory.isTyping(room);
    };

    $scope.typing = function (room, event) {

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

        if (sendKey(event)) $scope.send();

        $scope.animateContainer();

    };

    $scope.keydownCheck = function (event) {
        if (sendKey(event)) return event.preventDefault();
    };

    $scope.designers = function () {
        return DataFactory.designers();
    };

    $scope.invite = function (designer, chat) {
        DataFactory.inviteUserToChat(designer, chat);
    };
}

ChatController.$inject = ['$scope', 'DataFactory', 'SessionService'];
module.exports = ChatController;