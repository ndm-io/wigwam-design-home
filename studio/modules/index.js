'use strict';

module.exports = angular.module('modules',
    [
        require('./home').name,
        require('./print').name,
        require('./pages').name,
        require('./login').name,
        require('./logout').name
    ])
    .config(require('../common/config/httpProvider'))
    .controller('MainCtrl', require('./MainController'));