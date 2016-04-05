'use strict';

var User = require('../../../models/User'),
    types = require('../../../config/IOTypes');


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
