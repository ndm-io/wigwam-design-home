'use strict';

module.exports = function clickableMapDirective () {

    return {
        controller: 'ClickableMapCtrl',
        controllerAs: 'clickableMapCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: {
            model:'=',
            eventHandler: '='
        },
        template: require('./clickable-map.html')

    };
}