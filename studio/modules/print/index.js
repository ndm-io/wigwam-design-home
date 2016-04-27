'use strict';

module.exports = angular.module('modules.print', [
        require('./terms-print-view').name
    ])
    .directive('printView', require('./printDirective'))
    .controller('PrintCtrl', require('./PrintController'))
    .config(require('./printRoutes'));