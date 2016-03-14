'use strict';

var ProjectModels = require('../../../models/Project');
var Project = ProjectModels.model('Project');

var ROLES = require('../../../config/constants').ROLES;

exports.projects = function (req, res) {
    var user = req.user, q;

    if (user.role > ROLES.editor) {
        q = {};
    } else {
        q = {clients: user._id}
    }

    Project.find(q)
        .populate('clients', '-password -isPrivileged')
        .deepPopulate(Project.deepPopProps())
        .exec(function (err, projects) {
            res.send(projects);
        });
};