
'use strict';

var clockWidgetDirective = function () {
    return {
        controller: 'ClockWidgetCtrl',
        controllerAs: 'clockWidgetCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./clock-widget.html')
    }
};

module.exports = clockWidgetDirective;