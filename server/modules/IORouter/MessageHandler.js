'use strict';

var InitHandler = require('./InitHandler'),
    ChatHandler = require('./ChatHandler'),
    ProjectHandler = require('./ProjectHandler'),
    TermsHandler = require('./TermsHandler');

exports.attachHandlersToSocket = function (io, socket) {
    InitHandler(io, socket);
    ChatHandler(io, socket);
    ProjectHandler(io, socket);
    TermsHandler(io, socket);
};
