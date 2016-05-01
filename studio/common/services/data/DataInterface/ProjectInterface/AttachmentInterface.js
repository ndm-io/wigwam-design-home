'use strict';

var types = require('../../../../../../server/config/IOTypes'),
    _ = require('lodash');

function AttachmentInterface (sf, cache) {
    return {
        attachmentsForProjectGuid: function (files, projectGuid) {
            var objs = _.map(files, function (file) {
                return file.model();
            });
            sf.emit(types.attachmentsForProjectGuid, {projectGuid: projectGuid, files: objs});
        }
    };
}

module.exports = AttachmentInterface;