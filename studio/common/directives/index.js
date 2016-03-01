'use strict';

module.exports = angular.module('common.directives', [
        require('./showTab').name
    ])
    .directive('formAutofillFix', require('./formAutofillFix.js'))
    .directive('ukChart', require('./ukChart.js'));
