'use strict';

module.exports = function personalDetailsDirective () {

    return {
        controller: 'PersonalDetailsCtrl',
        controllerAs: 'personalDetailsCtrl',
        bindToController: true,
        restrict: 'EA',
        template: require('./personal-details.html')

    };
};