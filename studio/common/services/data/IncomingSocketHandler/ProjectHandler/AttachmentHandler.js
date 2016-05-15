'use strict';

var types = require('../../../../../../server/config/IOTypes'),
    WWFile = require('../../../../../common/models/WWFile');


function AttachmentHandler(sf, cache) {

    sf.on(types.attachmentsForProjectGuid, function (data) {
        cache.projectWithGuid(data.projectGuid)
            .upsertAttachments(data.files);
    });

    sf.on(types.removeAttachment, function (data) {
        cache.projectWithGuid(data.projectGuid)
            .removeAttachment(data.attachmentGuid);
    });
}

module.exports = AttachmentHandler;