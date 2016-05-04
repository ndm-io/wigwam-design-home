var types = require('../../../../config/IOTypes');

var emit = (function () {

    var queue = [];

    var emitter = {
        emit: function (socket, command, data) {
            queue.push({socket: socket, command: command, data: data});
        },
        drain: function () {
            return new Promise(function (resolve) {
                var d = function () {
                    setTimeout(function () {
                        var next = queue.pop();
                        if (next) {
                            next.socket.emit(next.command, next.data);
                            d();
                        } else {
                            resolve();
                        }
                    }, 500);
                };
                d();
            });

        }
    };
    return emitter;
})();

module.exports = emit;

