'use strict';

var $ = require('jquery');

function projectAttachTileDirective() {

    return {
        controller: 'ProjectAttachTileCtrl',
        controllerAs: 'projectAttachTileCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project-attach-tile.html')
    };
}

module.exports = projectAttachTileDirective;