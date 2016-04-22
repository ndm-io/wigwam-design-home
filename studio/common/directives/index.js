'use strict';

module.exports = angular.module('common.directives', [
        require('./showTab').name,
        require('./calendar-widget').name,
        require('./chat-status-widget').name,
        require('./clickable-map').name,
        require('./location-selector').name,
        require('./personal-details').name,
        require('./chat').name,
        require('./clock-widget').name,
        require('./project-tile').name,
        require('./shortcut-tile').name
    ])
    .directive('formAutofillFix', require('./formAutofillFix.js'))
    .directive('ukChart', require('./ukChart.js'));
