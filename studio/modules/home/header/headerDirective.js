'use strict';

module.exports = function headerDirective() {
    return {
        controller: 'HeaderCtrl',
        controllerAs: 'headerCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./header.html')
    };
};