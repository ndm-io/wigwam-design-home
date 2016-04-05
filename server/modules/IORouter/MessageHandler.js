'use strict';

var InitHandler = require('./InitHandler'),
    ChatHandler = require('./ChatHandler');

exports.attachHandlersToSocket = function (io, socket) {
    InitHandler(io, socket);
    ChatHandler(io, socket);
};
