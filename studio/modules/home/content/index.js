module.exports = angular.module('modules.home.content', [])
    .directive('contentView', require('./contentDirective'))
    .controller('ContentCtrl', require('./ContentController'));