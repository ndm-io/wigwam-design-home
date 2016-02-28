module.exports = angular.module('modules.home.sidebar', [])
    .directive('homeSidebarView', require('./sidebarDirective'))
    .controller('SidebarCtrl', require('./SidebarController'));