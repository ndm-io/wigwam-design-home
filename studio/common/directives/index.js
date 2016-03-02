'use strict';

module.exports = angular.module('common.directives', [
        require('./showTab').name,
        require('./calendar-widget').name,
        require('./clickable-map').name
    ])
    .directive('formAutofillFix', require('./formAutofillFix.js'))
    .directive('ukChart', require('./ukChart.js'));
