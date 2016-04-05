'use strict';

var types = require('../../../config/IOTypes'),
    status = require('../../../config/statuses'),
    SendUpdates = require('./SendUpdates');

module.exports = function (io, socket) {
    return function () {
        socket.user.goOffline();
        io.emit(types.chatStatus, {user: socket.user.card(), status: status.offline});
        SendUpdates(io)(socket.user);
    };
};