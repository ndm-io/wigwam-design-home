'use strict';

var User = require('../../../models/User'),
    Project = require('../../../models/Project').model('Project'),
    types = require('../../../config/IOTypes'),
    _ = require('lodash');


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
                });

                socket.emit(types.projects, projects);
            })
            .catch(function (err) {
                console.log('Error getting projects for user: ', err);
            });
    }
};
