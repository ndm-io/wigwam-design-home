module.exports = angular.module('common.directives.personalDetails', [])
    .directive('personalDetails', require('./personalDetailsDirective.js'))
    .controller('PersonalDetailsCtrl', require('./PersonalDetailsController.js'));