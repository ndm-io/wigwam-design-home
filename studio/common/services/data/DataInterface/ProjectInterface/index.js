'use strict';

var types = require('../../../../../../server/config/IOTypes');

var dataForKeys = function (keys, project) {
    var data = {};
    _.each(keys, function (key) {
        data[key] = project[key];
    });
    return data;
};

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
        },
        removeProjectWithGuid: function (projectGuid) {
            sf.emit(types.removeProject, {projectGuid:projectGuid});
        },
        updateProjectWithKeys: function (projectGuid, keys) {

            var data = {
                projectGuid: projectGuid,
                data: dataForKeys(keys, cache.projectWithGuid(projectGuid))
            };

            sf.emit(types.updateProject, data);
        }
    };
};