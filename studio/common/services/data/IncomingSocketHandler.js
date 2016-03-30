'use strict';

var _ = require('lodash'),
    types = require('../../../../server/config/IOTypes'),
    User = require('../../../common/models/User'),
    Chat = require('../../../common/models/Chat'),
    Handler = require('./Handler');

var IncomingSocketHandler = function (SocketFactory, cache) {
    var handler = Handler(SocketFactory, cache);

    handler.handleUpdate(types.designersAvailable, {prop: 'designers', model: User, clobber: true});
    handler.handleUpdate(types.requestChat, {prop: 'chats', model: Chat, clobber: false});

    handler.handle(types.userLeftRoom, function (data) {
        cache.removeUserFromRoom(data.user, data.room);
    });

    handler.handle(types.chatMessage, function (data) {
        cache.addMessageDataToRoom(data.message, data.room);
    });
};


module.exports = IncomingSocketHandler;