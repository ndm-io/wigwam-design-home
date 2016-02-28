module.exports = angular.module('modules.home.profile', [])
    .directive('profileView', require('./profileDirective'))
    .controller('ProfileCtrl', require('./ProfileController'));