module.exports = angular.module('common.directives.personalDetails', [])
    .directive('personalDetailsDirective', require('./personalDetailsDirective.js'))
    .controller('PersonalDetailsCtrl', require('./PersonalDetailsController.js'));