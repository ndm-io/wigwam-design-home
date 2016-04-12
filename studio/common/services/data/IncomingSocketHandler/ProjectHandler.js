'use strict';

var types = require('../../../../../server/config/IOTypes');

function projectHandler (SocketFactory, user, cache) {
    SocketFactory.on(types.newProject, function (data) {
        cache.newProject(data);
    });

    SocketFactory.on(types.updateProjectAddress, function (data) {
        console.log('new input', data);

    });
}

module.exports = projectHandler;