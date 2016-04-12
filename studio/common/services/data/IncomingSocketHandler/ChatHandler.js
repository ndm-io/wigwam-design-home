'use strict';

var types = require('../../../../../server/config/IOTypes');

function chatHandler (SocketFactory, user, cache) {
    SocketFactory.on(types.userJoinChats, function (data) {
        cache.addUserToChats(data);
    });
    
    SocketFactory.on(types.userJoinedChat, function (data) {
        cache.addUserToChat(data);
    });
    
    SocketFactory.on(types.userLeftRoom, function (data) {
        cache.removeUserFromRoom(data.user, data.room);
    });
    
    SocketFactory.on(types.chatMessage, function (data) {
        cache.isTyping[data.room] = false;
        cache.addMessageDataToRoom(data.message, data.room);
    });
    
    SocketFactory.on(types.userIsTyping, function (data) {
        if (user._id != data.user._id) cache.isTyping[data.room] = true;
    });
    
    SocketFactory.on(types.userStoppedTyping, function (data) {
        cache.isTyping[data.room] = false;
    });
    
    SocketFactory.on(types.usersOnline, function (data) {
        cache.addOnlineUsers(data);
    });

}

module.exports = chatHandler;