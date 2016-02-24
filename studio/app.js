'use strict';

var angular = require('angular');

module.exports = angular.module('app',
    [
        require('./common/common.js').name,
        require('./modules').name
    ])
    .config(require('./appConfig'))
    .constant('version', require('../package.json').version)
    .run(require('./common/common-init.js'));

