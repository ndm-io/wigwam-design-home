var socketIO = require('socket.io'),
    MessageHandler = require('./MessageHandler');

exports.initIO = function (server) {

    var sio = socketIO(server);
    sio.serveClient(true);

    sio.on('connection', function (socket) {

        MessageHandler.attachHandlersToSocket(socket);

    });

};