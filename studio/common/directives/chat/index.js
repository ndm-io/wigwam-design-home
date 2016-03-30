module.exports = angular.module('common.directives.chat', [])
    .directive('chat', require('./chatDirective'))
    .directive('chatIsTyping', require('./chat-is-typing'))
    .controller('ChatCtrl', require('./ChatController'));