'use strict';

var Attacher = require('../Common').attach,
    ProjectModels = require('../../../models/Project'),
    Project = ProjectModels.model('Project'),
    Attachment = ProjectModels.model('Attachment'),
    types = require('../../../config/IOTypes'),
    _ = require('lodash'),
    Promise = require('promise');

var filesToAttachments = function (files) {

    var promises = _.map(files, function (file) {
        return new Promise(function (resolve, reject) {
            var attachment = new Attachment(file);
            attachment.save(function (err) {
                if (err) reject(err);
                resolve(attachment);
            })
        })
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
                            console.log(attachment);
                        });


                        io.to(project.guid).emit(types.attachmentsForProjectGuid, data);

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
};