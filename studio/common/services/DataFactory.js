'use strict';

var Helper = require('./data');

var Cache = Helper.cache,
    Interface = Helper.interface,
    Incoming = Helper.incomingSocketHandler;

var DataFactory = function (SocketFactory) {

    var cache = Cache();

    Incoming(SocketFactory, cache);

    return Interface(SocketFactory, cache);

};


DataFactory.$inject = ['SocketFactory'];
module.exports = DataFactory;
