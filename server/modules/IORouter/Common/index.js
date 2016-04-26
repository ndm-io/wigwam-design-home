'use strict';

var User = require('../../../models/User'),
    Project = require('../../../models/Project').model('Project'),
    types = require('../../../config/IOTypes'),
    _ = require('lodash'),
    emitter = require('./emit');


exports.designers = function (io) {
    return User.designers()
        .then(function (designers) {
            io.emit(types.designersAvailable, designers);
        })
        .catch(function (err) {
            console.log(err);
        });
};

exports.onlineUsers = function (socket) {
    User.onlineUsers()
        .then(function (users) {
            socket.emit(types.usersOnline, users);
        });
};

exports.projects = function (socket) {
    if (socket && socket.user) {

        Project.projectsForUser(socket.user)
            .then(function (projects) {

                _.each(projects, function (project) {
                    socket.join(project.guid);
                    emitter.emit(socket, types.newProject, project);
                });

            })
            .catch(function (err) {
                console.log('Error getting projects for user: ', err);
            });

    }
};

exports.attach = function (socket) {
    return function (event, fn) {
        socket.on(event, function (data) {
            if (!socket.user) return;
            fn(data);
        });
    };
};
