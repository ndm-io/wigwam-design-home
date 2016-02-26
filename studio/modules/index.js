'use strict';

module.exports = angular.module('modules',
    [
        require('./home').name,
        require('./pages').name,
        require('./login').name
    ])
    .config(require('../common/config/httpProvider'))
    .controller('MainCtrl', require('./MainController'));