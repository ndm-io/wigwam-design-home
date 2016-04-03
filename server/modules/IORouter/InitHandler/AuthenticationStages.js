'use strict';

var types = require('../../../config/IOTypes'),
    DisconnectActions = require('./DisconnectActions'),
    SendUpdates = require('./SendUpdates');

var goOnline = function (socket) {
    return function (user) {
        user.goOnline(socket.id);
        return user;
    }
};

var updateSocket = function (io, socket) {
    return function (user) {
        socket.user = user;
        socket.disconnectActions = DisconnectActions(io, socket);
        socket.emit(types.socketId, socket.id);
        return user;
    };
};

var sendUpdates = function (io) {
    return SendUpdates(io);
};


module.exports = {
    goOnline: goOnline,
    updateSocket: updateSocket,
    sendUpdates: sendUpdates
};