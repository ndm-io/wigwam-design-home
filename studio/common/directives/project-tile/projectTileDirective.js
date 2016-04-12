'use strict';


function projectTileDirective() {

    return {
        controller: 'ProjectTileCtrl',
        controllerAs: 'projectTileCtrl',
        template: require('./project-tile.html'),
        scope:{
            project:'='
        }
    };
}

module.exports = projectTileDirective;