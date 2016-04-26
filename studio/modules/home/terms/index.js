module.exports = angular.module('modules.home.terms', [])
    .directive('termsView', require('./termsDirective'))
    .controller('TermsCtrl', require('./TermsController'));