'use strict';

var ChatInterface = require('./ChatInterface'),
    ProjectInterface = require('./ProjectInterface'),
    TermsInterface = require('./TermsInterface');

var DataInterface = function (SocketFactory, cache) {
    var chat = ChatInterface(SocketFactory, cache),
        project = ProjectInterface(SocketFactory, cache),
        terms = TermsInterface(SocketFactory, cache);

    return {
        chat: chat,
        project: project,
        terms: terms
    };

};

module.exports = DataInterface;