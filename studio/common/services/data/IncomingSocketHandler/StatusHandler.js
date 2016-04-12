'use strict';

var types = require('../../../../../server/config/IOTypes'),
    status = require('../../../../../server/config/statuses');

function statusHandler (SocketFactory, cache) {
    SocketFactory.on(types.chatStatus, function (data) {


        switch (data.status) {
            case status.online: {
                //cache.onlineUsers.push(data.user);
                break;
            }
            case status.offline: {
                cache.removeUserFromChats(data.user);
                break;
            }
            case status.busy: {
                cache.removeUserFromChats(data.user);
                break;
            }
        }
    });
}

module.exports = statusHandler;