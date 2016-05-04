'use strict';

var types = require('../../../config/IOTypes'),
    Attacher = require('../Common').attach;

var ProjectModels = require('../../../models/Project'),
    Project = ProjectModels.model('Project'),
    Designbrief = ProjectModels.model('Designbrief');


function DesignbriefHandler(io, socket) {
    var attach = Attacher(socket);

    attach(types.newDesignbrief, function (data) {

        Project.projectWithGuid(data.projectGuid)
            .then(function (project) {
                project.briefs.push(data.brief);
                return project.saveProject();
            })
            .then(function (project) {
                socket.broadcast.to(project.guid).emit(types.newDesignbrief, data);
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    attach(types.updateDesignbrief, function (data) {

        var proj;

        Project.projectWithGuid(data.projectGuid)
            .then(function (project) {
                proj = project;
                return project.briefWithGuid(data.briefGuid);
            })
            .then(function (brief) {
                return brief.updateWithJson(data.data);
            })
            .then(function () {
                proj.markModified('briefs');
                proj.save(function (err) {
                    if (!err) io.to(data.projectGuid).emit(types.updateDesignbrief, data);
                });
            })
            .catch(function (err) {
                console.log(err);
            })
    });

    attach(types.lockBrief, function (data) {
        var proj;

        Project.projectWithGuid(data.projectGuid)
            .then(function (project) {
                proj = project;
                return project.briefWithGuid(data.briefGuid);
            })
            .then(function (brief) {
                brief.completedDate = new Date(data.timeStamp);
                return brief;
            })
            .then(function () {
                proj.markModified('briefs');
                proj.save(function (err) {
                    if (!err) io.to(data.projectGuid).emit(types.lockBrief, data);
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    });

}

module.exports = DesignbriefHandler;