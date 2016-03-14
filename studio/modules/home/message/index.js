module.exports = angular.module('modules.home.message', [])
    .directive('messageView', require('./messageDirective'))
    .controller('MessageCtrl', require('./MessageController'));