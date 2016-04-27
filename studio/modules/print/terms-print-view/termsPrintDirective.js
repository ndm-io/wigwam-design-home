'use strict';

function termsPrintDirective ($stateParams) {

    var link = function (scope) {
        scope.terms = $stateParams.data;
    };

    return {
        link: link,
        restrict: 'EA',
        scope: true,
        template: require('./terms-print.html')
    };
}

termsPrintDirective.$inject = ['$stateParams'];
module.exports = termsPrintDirective;