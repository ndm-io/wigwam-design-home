'use strict';

module.exports = function messageDirective () {
    return {
        controller: 'MessageCtrl',
        controllerAs: 'messageCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./message.html')
    }
};