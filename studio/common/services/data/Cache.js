'use strict';

var _ = require('lodash');

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

    var removeUserFromRoom = function (user, room) {
        var chat = chatWithRoom(room);
        if (chat) removeUserFromChat(user, chat);
        return chat;
    };

    var addMessageToRoom = function (message, room) {
        var chat = chatWithRoom(room);
        chat.messages.push(message);
    };

    var ret = {
        projects: undefined,
        designers: [],
        chats: [],
        removeUserFromRoom: removeUserFromRoom,
        addMessageToRoom: addMessageToRoom
    };

    return ret;
};