'use strict';

module.exports = function sidebarDirective() {

    var el = document.getElementById('main'),
        body = document.body;


    var link = function (scope) {
        scope.height = function () {
            return Math.max(el.scrollHeight, body.offsetHeight) + 'px';
        };
    };

    return {
        link: link,
        controller: 'SidebarCtrl',
        controllerAs: 'sidebarCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./sidebar.html')
    }
};