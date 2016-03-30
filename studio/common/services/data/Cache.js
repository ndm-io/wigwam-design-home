'use strict';

var _ = require('lodash'),
    Message = require('../../models/Message');

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
        removeUserFromRoom: removeUserFromRoom,
        addMessageDataToRoom: addMessageDataToRoom,
        isTyping: false
    };

    return ret;
};