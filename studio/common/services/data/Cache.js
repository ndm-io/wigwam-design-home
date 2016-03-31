'use strict';

var _ = require('lodash'),
    Message = require('../../models/Message'),
    User = require('../../models/User');

module.exports = function () {

    var chatWithRoom = function (room) {
        return _.find(ret.chats, function (chat) {
            return chat.name === room;
        });
    };

    var removeUserFromChat = function (user, chat) {
        _.remove(chat.occupants, function (occ) {
            return occ.email === user.email;
        });
    };

    var removeUserFromChats = function (user) {
        _.each(ret.chats, function (chat) {
            removeUserFromChat(user, chat);
        });
    };

    var addUserToChats = function (data) {
        var user = new User(data.user);
        var rooms = _.map(data.chats, function (chat) {
            return chat.name;
        });

        _.each(ret.chats, function (chat) {
            if (_.contains(rooms, chat.name)) chat.addOccupant(user);
        });
    };

    var removeUserFromRoom = function (user, room) {
        var chat = chatWithRoom(room);
        if (chat) removeUserFromChat(user, chat);
        return chat;
    };

    var addMessageDataToRoom = function (data, room) {
        var chat = chatWithRoom(room);
        var message = new Message();
        message.initFromJson(data);
        chat.messages.push(message);

    };

    var ret = {
        projects: undefined,
        designers: [],
        chats: [],
        removeUserFromChats: removeUserFromChats,
        addUserToChats: addUserToChats,
        removeUserFromRoom: removeUserFromRoom,
        addMessageDataToRoom: addMessageDataToRoom,
        isTyping: {}
    };

    return ret;
};