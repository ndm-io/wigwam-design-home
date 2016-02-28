'use strict';

module.exports = function breadcrumbDirective () {
    return {
        controller: 'BreadcrumbCtrl',
        controllerAs: 'breadcrumbCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./breadcrumb.html')
    }
};