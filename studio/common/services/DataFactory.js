'use strict';

var Promise = require('promise');
var Project = require('../models/Project');

var DataFactory = function(CommsFactory) {

    var _projects;

    return {
        projects:function () {
            if (_projects) {
                return Promise.resolve(_projects);
            }
            return CommsFactory.projects()
                .then(function (projects) {
                    _projects = _.map(projects, function (json) {
                        var project = new Project();
                        project.initFromJson(json);
                        return project;
                    });
                    return _projects;
                });
        }
    };

};

DataFactory.$inject = ['CommsFactory'];
module.exports = DataFactory;
