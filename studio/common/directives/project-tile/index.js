module.exports = angular.module('common.directives.projectTile', [])
    .directive('projectTile', require('./projectTileDirective'))
    .controller('ProjectTileCtrl', require('./ProjectTileController'));