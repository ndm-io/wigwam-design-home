'use strict';

var ProjectModels = require('../../../models/Project'),
    Project = ProjectModels.model('Project'),
    types = require('../../../config/IOTypes'),
    _ = require('lodash'),
    roles = require('../../../config/constants').ROLES,
    Attacher = require('../Common').attach;



function ProjectHandler(io, socket) {

    var attach = Attacher(socket);

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
        Project.findOne({guid:data.projectGuid}, function (err, project) {
            if (!project) return;
            project.address = data.address;
            project.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    io.to(data.projectGuid).emit(types.updateProjectAddress, data);
                }
            });
        });
    });

    attach(types.removeProject, function (data) {
        Project.find({guid:data.projectGuid}).remove().exec();
        io.to(data.projectGuid).emit(types.removeProject, data);
    });

    attach(types.updateProject, function (data) {

        Project.findOne({guid:data.projectGuid}, function (err, project) {
            if (!project) return;
            var keys = Object.keys(data.data);

            _.each(keys, function (key) {
                project[key] = data.data[key];
            });

            project.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    io.to(data.projectGuid).emit(types.updateProject, data);
                }
            });
        });

    });

}

module.exports = ProjectHandler;
