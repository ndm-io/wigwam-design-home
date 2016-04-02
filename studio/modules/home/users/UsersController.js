'use strict';

var _ = require('lodash');

var UsersController = function ($scope, DataFactory) {

    DataFactory.requestOnlineUsers();

    $scope.__defineGetter__('users', function () {
        return DataFactory.usersOnline();
    });

    $scope.__defineGetter__('chats', function () {
        return DataFactory.chats();
    });
};

UsersController.$inject = ['$scope', 'DataFactory'];
module.exports = UsersController;