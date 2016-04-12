'use strict';

var types = require('../../../../../server/config/IOTypes'),
    statuses = require('../../../../../server/config/statuses');

module.exports = function (sf, cache) {
    return {
        designers: function () {
            return cache.designers;
        },
        chats: function () {
            return cache.chats;
        },
        chatStatus: function (user, status) {
            sf.emit(types.chatStatus, {status: status, user: user});
            if (status === statuses.online) sf.emit(types.userJoinChats, {user: user, chats: cache.chats});
        },
        instigateChat: function (chat) {
            sf.emit(types.inviteUserToChat, chat.requests());
        },
        inviteUserToChat: function (user, chat) {
            sf.emit(types.inviteUserToChat, {user: user, chat: chat});
        },
        requestOnlineUsers: function () {
            sf.emit(types.usersOnline, {});
        },
        usersOnline: function () {
            return cache.onlineUsers;
        },
        leaveRoom: function (user, roomName) {
            cache.removeUserFromRoom(user, roomName);
            cache.removeChatWithRoomName(roomName);
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