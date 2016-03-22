module.exports = angular.module('common.directives.chatStatusWidget', [])
    .directive('chatStatusWidget', require('./chatStatusWidgetDirective'))
    .controller('ChatStatusWidgetCtrl', require('./ChatStatusWidgetController'));