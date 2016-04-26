var emit = (function () {

    var queue = [];

    var emitter = {
        emit: function (socket, command, data) {
            queue.push({socket: socket, command: command, data: data});
            emitter.drain();
        },
        drain: function () {
            setTimeout(function () {
                var next = queue.pop();
                if (next) {
                    next.socket.emit(next.command, next.data);
                }
            }, 0);
        }
    };
    return emitter;
})();

module.exports = emit;

