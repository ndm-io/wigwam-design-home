'use strict';

var $ = require('jquery');

function shortcutTileDirective($state) {

    var link = function (scope, el, attrs) {
        scope.onSrc = attrs.onSrc;
        scope.offSrc = attrs.offSrc;
        scope.title = attrs.title;

        scope.go = function () {
            $state.go(attrs.sref);
        };

    };

    return {
        link: link,
        controller: 'ShortcutTileCtrl',
        controllerAs: 'shortcutTileCtrl',
        template: require('./shortcut-tile.html'),
        scope:{
            toggleOn:'='
        }
    };
}

shortcutTileDirective.$inject = ['$state'];
module.exports = shortcutTileDirective;