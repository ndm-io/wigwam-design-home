'use strict';

require('./superbox.js');

var _ = require('lodash');

function superboxDirective($timeout, $compile) {

    var superbox = function (scope, el) {
        jQuery(el).SuperBox({
            scope: scope,
            compile: $compile
        });
    };

    var link = function (scope, el) {
        $timeout(function () {

            superbox(scope, el);
            scope.refreshSuperbox = function () {
                superbox(scope, el);
            };

        }, 10);
    };

    return {
        link: link,
        controller:'SuperboxCtrl',
        controllerAs: 'superboxCtrl',
        scope: true
    };
}

superboxDirective.$inject = ['$timeout', '$compile'];
module.exports = superboxDirective;