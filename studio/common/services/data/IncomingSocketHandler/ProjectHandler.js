'use strict';

var types = require('../../../../../server/config/IOTypes'),
    Address = require('../../../../common/models/Address'),
    Feature = require('../../../../common/models/Feature');

function projectHandler (SocketFactory, user, cache) {
    SocketFactory.on(types.newProject, function (data) {
        cache.newProject(data);
    });

    SocketFactory.on(types.updateProjectAddress, function (data) {
        var project = cache.projectWithGuid(data.projectGuid);
        project.address = new Address(data.address);
    });

    SocketFactory.on(types.removeProject, function (data) {
        cache.removeProjectWithGuid(data.projectGuid);
    });

    SocketFactory.on(types.updateProject, function (data) {
        cache.updateProjectWithData(data.projectGuid, data.data);
    });
}

module.exports = projectHandler;