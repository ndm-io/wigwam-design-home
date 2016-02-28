module.exports = angular.module('modules.home.messages', [])
    .directive('messagesView', require('./messagesDirective'))
    .controller('MessagesCtrl', require('./MessagesController'));