module.exports = angular.module('common.directives.clickableMap', [])
    .directive('clickableMap', require('./clickableMapDirective.js'))
    .controller('ClickableMapCtrl', require('./ClickableMapController.js'));