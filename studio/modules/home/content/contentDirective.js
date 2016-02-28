'use strict';

module.exports = function contentDirective () {
    return {
        controller: 'ContentCtrl',
        controllerAs: 'contentCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./content.html')
    }
};