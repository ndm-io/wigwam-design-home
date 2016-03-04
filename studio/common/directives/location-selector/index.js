module.exports = angular.module('common.directives.locationSelector', [])
    .directive('locationSelector', require('./locationSelectorDirective.js'))
    .controller('LocationSelectorCtrl', require('./LocationSelectorController.js'));