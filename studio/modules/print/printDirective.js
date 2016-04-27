'use strict';

module.exports = function printDirective() {
    return {
        controller: 'PrintCtrl',
        controllerAs: 'printCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./print.html')
    };
};