module.exports = angular.module('modules.home.breadcrumb', [])
    .directive('breadcrumbView', require('./breadcrumbDirective'))
    .controller('BreadcrumbCtrl', require('./BreadcrumbController'));