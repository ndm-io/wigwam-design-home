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

    handler.handleRemove(types.userLeftRoom, function (data) {
        var room = data.room, user = data.user;

        var chat = _.find(cache.chats, function (chat) {
            return chat.name === room;
        });

        console.log(chat.occupants);

        _.remove(chat.occupants, function (occ) {
            return occ.email === user.email;
        });

        if (chat.occupants.length === 0) {
            _.remove(c.chats, function (chat) {
                return chat.name === room;
            });
        }

    });
};



module.exports = IncomingSocketHandler;