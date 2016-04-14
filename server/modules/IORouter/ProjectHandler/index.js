'use strict';

var ProjectModels = require('../../../models/Project'),
    Project = ProjectModels.model('Project'),
    types = require('../../../config/IOTypes'),
    _ = require('lodash'),
    roles = require('../../../config/constants').ROLES;

function ProjectHandler(io, socket) {

    var attach = function (event, fn) {
        socket.on(event, function (data) {
            if (!socket.user) return;
            fn(data);
        });
    };

    attach(types.newProject, function (data) {
        socket.join(data.guid);

        _(_.values(io.sockets.adapter.nsp.sockets))
            .filter(function (skt) {
                return skt.user.role > roles.guest;
            })
            .each(function (skt) {
                skt.join(data.guid);
            });


        var project = new Project(data);

        project.save(function (err) {
            if (!err) io.to(data.guid).emit(types.newProject, data);
        });

    });


    attach(types.updateProjectAddress, function (data) {
        io.to(data.projectGuid).emit(types.updateProjectAddress, data);
    });

    attach(types.removeProject, function (data) {

        Project.find({guid:data.projectGuid}).remove().exec();

        io.to(data.projectGuid).emit(types.removeProject, data);
    });

    attach(types.updateProject, function (data) {
        io.to(data.projectGuid).emit(types.updateProject, data);
    });

}

module.exports = ProjectHandler;
