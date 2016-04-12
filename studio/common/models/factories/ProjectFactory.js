'use strict';

var Project = require('../Project');

exports.projectWithJson = function (json) {
    var project = new Project();
    project.initFromJson(json);
    return project;
};

exports.projectWithClient = function (client) {
    var project = new Project();
    project.clients.push(client);
    project.generateUrn();
    project.setClientAsLocation();
    return project;
};