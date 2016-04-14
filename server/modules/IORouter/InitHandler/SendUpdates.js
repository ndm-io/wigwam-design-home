'use strict';

var Common = require('../Common'),
    roles = require('../../../config/constants').ROLES;

module.exports = function (io, socket) {
    return function (user) {
        if (user.role >= roles.editor) {
            Common.designers(io);
        }
        Common.projects(socket);
    };
};