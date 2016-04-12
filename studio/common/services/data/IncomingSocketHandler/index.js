'use strict';

var StatusHandler = require('./StatusHandler'),
    ChatHandler = require('./ChatHandler'),
    ProjectHandler = require('./ProjectHandler'),
    DesignersHandler = require('./DesignersHandler');

var IncomingSocketHandler = function (SocketFactory, cache, SessionService) {

    StatusHandler(SocketFactory, cache);
    DesignersHandler(SocketFactory, cache);
    ChatHandler(SocketFactory, SessionService.user, cache);
    ProjectHandler(SocketFactory, SessionService.user, cache);

};


module.exports = IncomingSocketHandler;