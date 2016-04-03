'use strict';

var types = require('../../../config/IOTypes'),
    status = require('../../../config/statuses');

module.exports = function (io, socket, sendUpdatesFn) {
    return function () {
        socket.user.goOffline();
        io.emit(types.chatStatus, {user: socket.user.card(), status: status.offline});
        sendUpdatesFn(io)(socket.user);
    };
};