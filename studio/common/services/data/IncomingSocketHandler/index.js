'use strict';

var StatusHandler = require('./StatusHandler'),
    ChatHandler = require('./ChatHandler'),
    ProjectHandler = require('./ProjectHandler'),
    DesignersHandler = require('./DesignersHandler'),
    TermsHandler = require('./TermsHandler'),
    types = require('../../../../../server/config/IOTypes');

var IncomingSocketHandler = function (SocketFactory, cache, SessionService) {

    StatusHandler(SocketFactory, cache);
    DesignersHandler(SocketFactory, cache);
    ChatHandler(SocketFactory, SessionService.user, cache);
    ProjectHandler(SocketFactory, SessionService.user, cache);
    TermsHandler(SocketFactory, cache);

    SocketFactory.on(types.dataStart, function () {
        console.log('about to download');
    });

    SocketFactory.on(types.dataEnd, function () {
       console.log('ending data');
    });

};


module.exports = IncomingSocketHandler;