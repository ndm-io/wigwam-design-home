'use strict';

module.exports = angular.module('modules.print.terms', [])
    .directive('termsPrintView', require('./termsPrintDirective'));