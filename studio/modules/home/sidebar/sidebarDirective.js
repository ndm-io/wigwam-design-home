'use strict';

module.exports = function sidebarDirective() {
    return {
        controller: 'SidebarCtrl',
        controllerAs: 'sidebarCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./sidebar.html')
    }
};