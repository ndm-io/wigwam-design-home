'use strict';

var Promise = require('promise'),
    _ = require('lodash'),
    types = require('../../../../server/config/IOTypes');

var DataInterface = function (SocketFactory, cache) {
    var sf = SocketFactory, c = cache;

    return {
        projects: function () {
            return Promise.resolve([]);
        },
        designers: function () {
            return c.designers;
        },
        chats: function () {
            return c.chats;
        },
        chatStatus: function (status) {
            sf.emit(types.chatStatus, status);
        },
        instigateChat: function (chat) {
            sf.emit(types.requestChat, chat);
        },
        leaveRoom: function (roomName) {
            _.remove(c.chats, function (chat) {
                return chat.name === roomName;
            });
            sf.emit(types.leaveRoom, roomName);
        },
        addMessage: function (model, message) {
            sf.emit(types.chatMessage, {room:model.name, message:message});
            //model.messages.push(message);
        }
    };
};

module.exports = DataInterface;