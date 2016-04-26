'use strict';

module.exports = function termsDirective () {
    return {
        controller: 'TermsCtrl',
        controllerAs: 'termsCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./terms.html')
    };
};