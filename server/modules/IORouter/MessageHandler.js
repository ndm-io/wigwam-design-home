'use strict';

var User = require('../../models/User'),
    types = require('../../config/IOTypes'),
    status = require('../../config/statuses'),
    roles = require('../../config/constants').ROLES;

var attach = function (socket, event, fn) {
    socket.on(event, function (msg) {
        if (!socket.user) socket.disconnect();
        fn(msg);
    });

};

var designers = function (io) {
    User.designers()
        .then(function (designers) {
            io.emit(types.designersAvailable, designers);
        })
        .catch(function (err) {
            console.log(err);
        });
};

exports.attachHandlersToSocket = function (io, socket) {
    socket.on(types.authenticate, function (data) {
        User.findOne(data, function (err, user) {
            if (err || !user) socket.disconnect();
            socket.user = user;
            socket.emit(types.socketId, socket.id);

            user.socketId = socket.id;
            user.save(function (err) {
                designers(io);
            });

        });
    });


    socket.on('disconnect', function () {
        if (!socket.user) return;
        socket.user.chatStatus = status.offline;
        socket.user.save();
        if (socket.user.role >= roles.editor) {
            designers(io);
        }
        io.emit(types.chatStatus, {user: socket.user.card(), status:status.offline});
    });

    attach(socket, types.chatStatus, function (data) {
        socket.user.chatStatus = data.status;
        socket.user.save();
        if (socket.user.role >= roles.editor) {
            designers(io);
        }
        io.emit(types.chatStatus, data);
    });

    attach(socket, types.userJoinChats, function (data) {
        io.emit(types.userJoinChats, data);
    });

    attach(socket, types.requestChat, function (data) {
        data.occupants.forEach(function (occupant) {
            if (!occupant) return;
            var skt = io.sockets.connected[occupant.socketId];
            if (skt) {
                skt.join(data.name)
                    .emit(types.requestChat, data);
            }
        });
    });

    attach(socket, types.leaveRoom, function (roomName) {
        io.to(roomName).emit(types.userLeftRoom, {room: roomName, user: socket.user.card()});
        socket.leave(roomName);
    });

    attach(socket, types.chatMessage, function (data) {
        io.to(data.room).emit(types.chatMessage, data);
    });

    attach(socket, types.userIsTyping, function (data) {
        io.to(data.room).emit(types.userIsTyping, data);
    });

    attach(socket, types.userStoppedTyping, function (data) {
        io.to(data.room).emit(types.userStoppedTyping, data);
    });

};