module.exports = angular.module('modules.home.dash', [])
    .directive('dashView', require('./dashDirective'))
    .controller('DashCtrl', require('./DashController'));