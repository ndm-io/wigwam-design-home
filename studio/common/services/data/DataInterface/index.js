'use strict';

var ChatInterface = require('./ChatInterface'),
    ProjectInterface = require('./ProjectInterface');

var DataInterface = function (SocketFactory, cache) {
    var sf = SocketFactory, c = cache;

    var chat = ChatInterface(sf, c),
        project = ProjectInterface(sf, c);

    return {
        chat: chat,
        project: project
    };

};

module.exports = DataInterface;