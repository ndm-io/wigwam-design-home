'use strict';

module.exports = angular.module('common.directives', [])
    .directive('formAutofillFix', require('./formAutofillFix.js'))
    .directive('ukChart', require('./ukChart.js'));
