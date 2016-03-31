'use strict';

var toggler = require('./toggler');

module.exports = function animatedSwitchDirective() {

    var link = function (scope, el, attrs) {
        toggler(el, function (value) {
            scope.animatedSwitchCtrl.notify(value);
        });
    };

    return {
        link: link,
        controller: 'AnimatedSwitchCtrl',
        controllerAs: 'animatedSwitchCtrl',
        bindToController: true,
        restrict: 'AE',
        template: require('./animated-switch.html'),
        scope: {
            notify: '='
        }
    };
};