'use strict';

var Helper = require('./data');

var Cache = Helper.cache,
    Interface = Helper.interface,
    Incoming = Helper.incomingSocketHandler;

var DataFactory = function (SocketFactory, SessionService) {

    var cache = Cache();

    Incoming(SocketFactory, cache, SessionService);
    return Interface(SocketFactory, cache);

};


DataFactory.$inject = ['SocketFactory', 'SessionService'];
module.exports = DataFactory;
