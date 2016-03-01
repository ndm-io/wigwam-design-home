'use strict';

module.exports = angular.module('common.directives.showTab', [])
    .directive('showTab', require('./showTabDirective'))
    .controller('ShowTabCtrl', require('./ShowTabController'));