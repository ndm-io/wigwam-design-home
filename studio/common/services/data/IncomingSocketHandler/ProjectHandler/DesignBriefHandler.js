'use strict';

var types = require('../../../../../../server/config/IOTypes'),
    Designbrief = require('../../../../../common/models/Designbrief');


function DesignBriefHandler(sf, user, cache) {

    var briefWithData = function (data) {
        var project = cache.projectWithGuid(data.projectGuid);
        return project.briefWithGuid(data.briefGuid);
    };

    sf.on(types.newDesignbrief, function (data) {
        var project = cache.projectWithGuid(data.projectGuid);
        project.brief = new Designbrief(data.brief);
    });

    sf.on(types.updateDesignbrief, function (data) {
        var brief = briefWithData(data);
        brief.selectWithObj(data.data);
    });

    sf.on(types.lockBrief, function (data) {
        var brief = briefWithData(data);
        brief.completedDate = new Date(data.timeStamp);
    });

}

module.exports = DesignBriefHandler;