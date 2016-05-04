'use strict';

var Designbrief = require('../../../../../common/models/Designbrief'),
    types = require('../../../../../../server/config/IOTypes');


function DesignbriefInterface(sf, cache) {

    var state = {};

    return {
        briefWithProjectGuid: function (projectGuid) {
            var project = cache.projectWithGuid(projectGuid);
            var brief = project.brief;

            if (!brief && !state[projectGuid]) {
                state[projectGuid] = true;
                brief = new Designbrief();
                project.brief= brief;
                sf.emit(types.newDesignbrief, {projectGuid: projectGuid, brief: brief});
            }

            return brief;

        },
        projectHasCompletedBrief: function (projectGuid) {
            var project = cache.projectWithGuid(projectGuid);
            if (!project) return false;

            var brief = project.brief;
            return (brief) ? brief.locked : false;
        },
        updateBrief: function (projectGuid, briefGuid, item, option) {

            var obj = {
                key: item.label,
                option: {
                    label: option.label,
                    description: option.description,
                    img:option.img
                }
            };

            sf.emit(types.updateDesignbrief, {
                projectGuid: projectGuid,
                briefGuid: briefGuid,
                data: obj
            });
        },
        lockBrief: function (projectGuid, briefGuid) {
            sf.emit(types.lockBrief, {
                projectGuid: projectGuid,
                briefGuid:briefGuid,
                timeStamp: new Date()
            });
        },
        newBriefWithProjectGuid: function (projectGuid) {
            var brief = new Designbrief();
            sf.emit(types.newDesignbrief, {projectGuid: projectGuid, brief: brief});
        }
    };
}

module.exports = DesignbriefInterface;