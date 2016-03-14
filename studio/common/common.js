window.jQuery = window.$ = require('jquery');
window._ = require('lodash');

require('angular-bootstrap');
require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');
require('domready/ready');
require('lodash');
require('restangular');
require('leaflet');
require('ui-leaflet');
require('angular-simple-logger');

marked = require('marked/lib/marked.js');
require('angular-md/dist/angular-md');

module.exports = angular.module('common',
    [
        'ui.bootstrap',
        'ui.router',
        'nemLogging',
        'ui-leaflet',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'restangular',
        'yaru22.md',
        require('./constants').name,
        require('./directives').name,
        require('./resources').name,
        require('./services').name
    ]);

