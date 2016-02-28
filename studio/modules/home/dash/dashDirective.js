'use strict';

module.exports = function dashDirective() {
    return {
        controller: 'DashCtrl',
        controllerAs: 'dashCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./dash.html')
    };
};