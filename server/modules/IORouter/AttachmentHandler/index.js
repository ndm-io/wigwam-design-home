'use strict';

var Attacher = require('../Common').attach,
    ProjectModels = require('../../../models/Project'),
    Project = ProjectModels.model('Project'),
    props = require('../../../models/Project/helpers/ProjectSchemaProps').attachment,
    Attachment = ProjectModels.model('Attachment'),
    types = require('../../../config/IOTypes'),
    _ = require('lodash'),
    Promise = require('promise');

var filesToAttachments = function (files) {

    var promises = _.map(files, function (file) {
        return new Promise(function (resolve, reject) {

            var attachment = new Attachment(file);

            Attachment.save(attachment)
                .then(Attachment.computeMetaData)
                .then(Attachment.save)
                .then(function (attachment) {
                    resolve(attachment);
                })
                .catch(function (err) {
                    console.log('error in filesToAttachemnts', err);
                    reject(err);
                });

        });
    });

    return Promise.all(promises);

};

module.exports = function (io, socket) {
    var attach = Attacher(socket);

    attach(types.attachmentsForProjectGuid, function (data) {

        Project.projectWithGuid(data.projectGuid)
            .then(function (project) {
                return filesToAttachments(data.files)
                    .then(function (attachments) {

                        _.each(attachments, function (attachment) {
                            project.attachments.push(attachment);
                        });

                        var propertiesRequired = props.split(' ');

                        var files = _.map(attachments, function (file) {

                            var obj = {};
                            _.each(propertiesRequired, function (property) {
                                if (property !== 'arrayBuffer') {
                                    obj[property] = file[property];
                                }
                            });

                            return obj;
                        });

                        io.to(project.guid).emit(types.attachmentsForProjectGuid, {
                            projectGuid: project.guid,
                            files: files
                        });
                        return project;
                    });

            })
            .then(function (project) {
                return project.saveProject();
            })
            .catch(function (err) {
                console.log('an err occured', err);
            });

    });

    attach(types.removeAttachment, function (data) {
        Attachment.findOneAndRemove({guid: data.attachmentGuid}, function (err) {
            if (err) {
                console.log(err);
            } else {
                socket.broadcast.to(data.projectGuid).emit(types.removeAttachment, data);
            }
        });
    });
};