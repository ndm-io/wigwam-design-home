'use strict';

var types = require('../../../../../server/config/IOTypes');

function designersHandler (SocketFactory, cache) {
    SocketFactory.on(types.designersAvailable, function (data) {
        cache.designers = data;
    });
}

module.exports = designersHandler;