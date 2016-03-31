'use strict';

var Promise = require('promise'),
    _ = require('lodash'),
    types = require('../../../../server/config/IOTypes'),
    statuses = require('../../../../server/config/statuses');

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
        chatStatus: function (user, status) {
            sf.emit(types.chatStatus, {status: status, user: user});
            if (status === statuses.online) sf.emit(types.userJoinChats, {user: user, chats: c.chats});
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
            sf.emit(types.chatMessage, {room: model.name, message: message});
        },
        isTyping: function (room) {
            return cache.isTyping[room];
        },
        roomIsTyping: function (data) {
            sf.emit(types.userIsTyping, data);
        },
        stopTyping: function (data) {
            sf.emit(types.userStoppedTyping, data);
        }

    };
};

module.exports = DataInterface;