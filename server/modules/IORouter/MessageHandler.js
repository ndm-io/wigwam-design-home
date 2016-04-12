'use strict';

var InitHandler = require('./InitHandler'),
    ChatHandler = require('./ChatHandler'),
    ProjectHandler = require('./ProjectHandler');

exports.attachHandlersToSocket = function (io, socket) {
    InitHandler(io, socket);
    ChatHandler(io, socket);
    ProjectHandler(io, socket);
};
