
module.exports = angular.module('modules.home.header', [])
    .directive('homeHeaderView', require('./headerDirective'))
    .controller('HeaderCtrl', require('./HeaderController'));