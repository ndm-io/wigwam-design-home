'use strict';

var _ = require('lodash'),
    types = require('../../../../server/config/IOTypes'),
    User = require('../../../common/models/User'),
    Chat = require('../../../common/models/Chat'),
    Handler = require('./Handler');

var IncomingSocketHandler = function (SocketFactory, cache, SessionService) {
    var handler = Handler(SocketFactory, cache);

    handler.handleUpdate(types.designersAvailable, {prop: 'designers', model: User, clobber: true});
    handler.handleUpdate(types.requestChat, {prop: 'chats', model: Chat, clobber: false});



    handler.handle(types.chatStatus, function (data) {
        handler.handleStatus(data, SessionService.user);
    });

    handler.handle(types.userJoinChats, function (data) {
        cache.addUserToChats(data);
    });

    handler.handle(types.userLeftRoom, function (data) {
        cache.removeUserFromRoom(data.user, data.room);
    });

    handler.handle(types.chatMessage, function (data) {
        cache.isTyping[data.room] = false;
        cache.addMessageDataToRoom(data.message, data.room);

    });

    handler.handle(types.userIsTyping, function (data) {
        if (SessionService.user._id != data.user._id) cache.isTyping[data.room] = true;
    });

    handler.handle(types.userStoppedTyping, function (data) {
        cache.isTyping[data.room] = false;
    });
};


module.exports = IncomingSocketHandler;