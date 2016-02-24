'use strict';

module.exports = angular.module('modules',
    [
        require('./home').name,
        require('./pages').name
    ])
    .controller('MainCtrl', require('./MainController'));