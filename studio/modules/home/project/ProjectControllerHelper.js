'use strict';

var ProjectFactory = require('../../../common/models/factories/ProjectFactory');

module.exports = function (DataFactory, user) {
    return {
        projectGuidFromParams: function (params) {
            if (!params.project) {
                var project = ProjectFactory.projectWithClient(user);
                DataFactory.project.newProject(project);
                return project.guid;
            } else {
                return params.project.guid;
            }
        }
    }
};