'use strict';

var types = require('../../../../../../server/config/IOTypes'),
    WWFile = require('../../../../../common/models/WWFile');


function AttachmentHandler(sf, cache) {

    sf.on(types.attachmentsForProjectGuid, function (data) {
        console.log('new attachments got', data);
    });
}

module.exports = AttachmentHandler;