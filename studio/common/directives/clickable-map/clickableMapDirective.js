'use strict';

module.exports = function clickableMapDirective () {

    var link = function (scope, el, attr) {
        scope.mapId = 'map-' + attr.id;
    };

    return {
        link:link,
        controller: 'ClickableMapCtrl',
        controllerAs: 'clickableMapCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: {
            mapModel:'=',
            eventHandler: '='
        },
        template: require('./clickable-map.html')

    };
};