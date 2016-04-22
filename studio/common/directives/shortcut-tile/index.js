'use strict';
module.exports = angular.module('common.directives.shortcutTile', [])
    .directive('shortcutTile', require('./shortcutTileDirective'))
    .controller('ShortcutTileCtrl', require('./ShortcutTileController'));