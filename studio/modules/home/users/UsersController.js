'use strict';

var _ = require('lodash'),
    Chat = require('../../../common/models/Chat');

var UsersController = function ($scope, DataFactory, SessionService) {

    DataFactory.requestOnlineUsers();

    $scope.__defineGetter__('users', function () {
        return DataFactory.usersOnline();
    });

    $scope.__defineGetter__('chats', function () {
        return DataFactory.chats();
    });

    $scope.requestChat = function (user) {
        var chat = new Chat({
            occupants: [user, SessionService.user],
            instigator: SessionService.user
        });

        DataFactory.instigateChat(chat);
    };
};

UsersController.$inject = ['$scope', 'DataFactory', 'SessionService'];
module.exports = UsersController;