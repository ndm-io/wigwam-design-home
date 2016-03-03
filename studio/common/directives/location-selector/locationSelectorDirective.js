'use strict';

module.exports = function locationSelectorDirective () {

    var link = function (scope, el, attrs) {
        scope.title = attrs.title;
    };

    return {
        link:link,
        controller: 'LocationSelectorCtrl',
        controllerAs: 'locationSelectorCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: {
            mapModel:'=',
            eventHandler:'='
        },
        template: require('./location-selector.html')

    };
};