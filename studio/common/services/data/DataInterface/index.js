'use strict';

var ChatInterface = require('./ChatInterface'),
    ProjectInterface = require('./ProjectInterface'),
    TermsInterface = require('./TermsInterface'),
    EventsInterface = require('./EventsInterface');

var DataInterface = function (SocketFactory, cache) {
    var chat = ChatInterface(SocketFactory, cache),
        project = ProjectInterface(SocketFactory, cache),
        terms = TermsInterface(SocketFactory, cache),
        events = EventsInterface(SocketFactory, cache);

    return {
        chat: chat,
        project: project,
        terms: terms,
        events: events
    };

};

module.exports = DataInterface;