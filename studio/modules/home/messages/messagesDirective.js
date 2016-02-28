'use strict';

module.exports = function messagesDirective () {
    return {
        controller: 'MessagesCtrl',
        controllerAs: 'messagesCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./messages.html')
    }
};