module.exports = angular.module('common.directives.chat', [])
    .directive('chat', require('./chatDirective'))
    .controller('ChatCtrl', require('./ChatController'));