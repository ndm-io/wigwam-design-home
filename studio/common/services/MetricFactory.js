'use strict';

var _ = require('lodash');

var MetricFactory = function (DataFactory, SessionService) {

    //var _projects = undefined;
    //
    //DataFactory.projects()
    //    .then(function (projects) {
    //        _projects = projects;
    //    });
    //
    //var totalMessages = function () {
    //    return _.reduce(_projects, function (sum, project) {
    //        return sum + project.messages.length;
    //    }, 0);
    //};
    //
    //var unreadMessages = function () {
    //    return _.reduce(_projects, function (sum, project) {
    //        return sum + project.unreadMessagesCount(SessionService.user);
    //    }, 0);
    //};


    //return {
    //    totalMessages: totalMessages,
    //    unreadMessages: unreadMessages
    //};

    return {
        totalMessages: function () {
            return 0;
        },
        unreadMessages: function () {
            return 0;
        }
    };
};

MetricFactory.$inject = ['DataFactory', 'SessionService'];
module.exports = MetricFactory;