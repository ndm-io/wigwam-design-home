'use strict';

var User = require('../../models/User');

exports.attachHandlersToSocket = function (socket) {
    socket.on('authentication.authenticate', function (data) {
        User.findOne(data, function (err, user) {
            if (err || ! user) socket.disconnect();
            socket.user = user;

        });
    });

    socket.on('message', function (msg) {
        console.log(msg);
    });

    setInterval(function () {
        var data = {user:socket.user.email, msg: new Date()};
        console.log(data);
        socket.emit('chat', data);
    }, 1000);
};