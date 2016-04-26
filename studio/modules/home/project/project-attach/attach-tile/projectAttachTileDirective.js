'use strict';

var $ = require('jquery');

function projectAttachTileDirective() {

    var link = function (scope, el, attrs) {
        scope.ctx = $(el).find('canvas')[0].getContext('2d');
    };

    return {
        link: link,
        controller: 'ProjectAttachTileCtrl',
        controllerAs: 'projectAttachTileCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./project-attach-tile.html')
    };
}

module.exports = projectAttachTileDirective;