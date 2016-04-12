'use strict';

var types = require('../../../config/IOTypes'),
    Common = require('../Common'),
    _ = require('lodash');

function ProjectHandler (io, socket) {

    var attach = function (event, fn) {
        socket.on(event, function (data) {
            if (!socket.user) return;
            fn(data);
        });
    };

    attach(types.newProject, function (data) {
        socket.join(data.guid);
        io.to(data.guid).emit(types.newProject, data);
    });

    attach(types.updateProjectAddress, function (data) {
        console.log(data);
        io.to(data.projectGuid).emit(types.updateProjectAddress, data);
    });

}

module.exports = ProjectHandler;
