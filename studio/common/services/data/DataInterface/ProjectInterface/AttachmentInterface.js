'use strict';

var types = require('../../../../../../server/config/IOTypes'),
    _ = require('lodash'),
    Promise = require('promise'),
    WWFile = require('../../../../../common/models/WWFile');

function AttachmentInterface(sf, cache) {

    return {
        attachmentsForProjectGuid: function (files, projectGuid) {

            return new Promise(function (resolve, reject) {

                var objs = _.map(files, function (file) {
                    return file.model(projectGuid);
                });

                sf.emit(types.attachmentsForProjectGuid, {
                    projectGuid: projectGuid,
                    files: objs
                });

                cache.projectWithGuid(projectGuid)
                    .addAttachments(files);

                resolve(objs);
            });

        },
        removeAttachmentForProjectGuid: function (attachmentGuid, projectGuid) {

            sf.emit(types.removeAttachment, {
                projectGuid: projectGuid,
                attachmentGuid: attachmentGuid
            });

            cache.projectWithGuid(projectGuid)
                .removeAttachment(attachmentGuid);
        }
    };
}

module.exports = AttachmentInterface;