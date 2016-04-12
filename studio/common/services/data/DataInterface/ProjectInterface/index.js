'use strict';

var types = require('../../../../../../server/config/IOTypes');

module.exports = function (sf, cache) {
    return {
        projects: function () {
            return cache.projects;
        },
        newProject: function (project) {
            sf.emit(types.newProject, project);
        },
        projectWithGuid: function (guid) {
            return cache.projectWithGuid(guid);
        },
        updateProjectAddress: function (projectGuid, address) {
            sf.emit(types.updateProjectAddress, {projectGuid:projectGuid, address:address});
        }
    };
};