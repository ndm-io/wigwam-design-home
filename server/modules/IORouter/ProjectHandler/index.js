'use strict';


var ProjectHandler = require('./ProjectHandler'),
    ImagesHandler = require('./ImagesHandler'),
    DesignbriefHandler = require('./DesignbriefHandler');


module.exports = function (io, socket) {

    ProjectHandler(io, socket);
    ImagesHandler(io, socket);
    DesignbriefHandler(io, socket);

};
