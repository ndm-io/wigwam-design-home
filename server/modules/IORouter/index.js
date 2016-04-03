var socketIO = require('socket.io'),
    MessageHandler = require('./MessageHandler'),
    User = require('../../models/User'),
    validateEmail = require('../email-validator');

exports.initIO = function (server, sessionMiddleware) {

    var sio = socketIO(server);
    sio.serveClient(true);

    sio.use(function(socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    sio.use(function (socket, next) {

        if (socket.request && socket.request.session && socket.request.session.passwordless) {

            validateEmail(socket.request.session.passwordless)
                .then(function (email) {
                   return User.user({email:email});
                })
                .then(function (user) {
                    socket.user = user;
                    next();
                })
                .catch(function (err) {
                    console.log('An error occurred', err);
                });

        }
    });

    sio.on('connection', function (socket) {
        MessageHandler.attachHandlersToSocket(sio, socket);
    });

};