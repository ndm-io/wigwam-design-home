'use strict';

var types = require('../../../config/IOTypes'),
    Common = require('../Common'),
    _ = require('lodash');

function ChatHandler (io, socket) {

    //var attach = function (event, fn) {
    //    socket.on(event, function (data) {
    //        if (!socket.user) return;
    //        fn(data);
    //    });
    //};

    var attach = Common.attach(socket);

    attach(types.chatStatus, function (data) {

        socket.user.status(data.status)
            .then(function () {
                io.emit(types.chatStatus, data);
                return true;
            })
            .then(Common.designers(io))
            .catch(function (err) {
                console.log('Error saving user' ,err);
            });

    });

    attach(types.usersOnline, function () {
       Common.onlineUsers(socket);
    });

    attach(types.userJoinChats, function (data) {
        io.emit(types.userJoinChats, data);
    });

    attach(types.inviteUserToChat, function (req) {

        if (!Array.isArray(req)) req = [req];

        _.each(req, function (data) {
            if (io.sockets.connected[data.user.socketId]) {
                io.sockets.connected[data.user.socketId].join(data.chat.name);
                io.to(data.chat.name).emit(types.userJoinedChat, data);
            }
        });
    });

    attach(types.inviteUserToChat, function (req) {

        if (!Array.isArray(req)) req = [req];

        _.each(req, function (data) {
            if (io.sockets.connected[data.user.socketId]) {
                io.sockets.connected[data.user.socketId].join(data.chat.name);
                io.to(data.chat.name).emit(types.userJoinedChat, data);
            }
        });
    });

    attach(types.leaveRoom, function (roomName) {
        io.to(roomName).emit(types.userLeftRoom, {room: roomName, user: socket.user.card()});
        socket.leave(roomName);
    });

    attach(types.chatMessage, function (data) {
        io.to(data.room).emit(types.chatMessage, data);
    });

    attach(types.userIsTyping, function (data) {
        io.to(data.room).emit(types.userIsTyping, data);
    });

    attach(types.userStoppedTyping, function (data) {
        io.to(data.room).emit(types.userStoppedTyping, data);
    });

}

module.exports = ChatHandler;


