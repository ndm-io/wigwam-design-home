'use strict';

var types = require('../../../config/IOTypes'),
    status = require('../../../config/statuses'),
    roles = require('../../../config/constants').ROLES,
    Common = require('../Common');

var disconnectActions = function (io, socket) {
    return function () {
        socket.user.goOffline();
        io.emit(types.chatStatus, {user: socket.user.card(), status: status.offline});
        sendUpdatesFn(io)(socket.user);
    }
};

var goOnline = function (socket) {
    return function (user) {
        user.goOnline(socket.id);
        socket.user = user;
        return user;
    }
};

var updateSocket = function (io, socket) {
    return function (user) {
        socket.user = user;
        socket.disconnectActions = disconnectActions(io, socket);
        socket.emit(types.socketId, socket.id);
        return user;
    };
};

var sendUpdatesFn = function (io) {
    return function (user) {
        if (user.role >= roles.editor) {
            Common.designers(io);
        }
    };
};

var sendUpdates = function (io) {
    return sendUpdatesFn(io);
};


module.exports = {
    goOnline: goOnline,
    updateSocket: updateSocket,
    sendUpdates: sendUpdates
};