'use strict';

var types = require('../../../config/IOTypes'),
    Disconnect = require('./Disconnect'),
    Authenticate = require('./Authenticate');


function InitHandler(io, socket) {

    socket.on(types.authenticate, Authenticate(io, socket));
    socket.on('disconnect', Disconnect(io, socket));

}

module.exports = InitHandler;