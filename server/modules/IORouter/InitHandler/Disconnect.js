'use strict';

function Disconnect (io, socket) {
    return function () {
        if (!socket.user) return;
        if (socket.disconnectActions) socket.disconnectActions(io, socket);
    };
}

module.exports = Disconnect;

