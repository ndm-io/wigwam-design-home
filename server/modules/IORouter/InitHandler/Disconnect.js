'use strict';

function Disconnect (io, socket) {
    return function () {
        if (!socket.user) return;
        socket.disconnectActions(io, socket);
    };
}

module.exports = Disconnect;

