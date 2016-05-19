window.jQuery = window.$ = require('jquery');
window._ = require('lodash');

require('jquery-ui');
require('bootstrap');
require('angular-ui-bootstrap');
require('angular-ui-switch');
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
require('angular-elastic');
require('pdfjs-dist');
require('./calendar.min.js');
require('angular-ui-calendar');

PDFJS.workerSrc = 'js/bundle.pdf.worker.js';

marked = require('marked/lib/marked.js');
require('angular-md/dist/angular-md');

module.exports = angular.module('common',
    [
        'ui.bootstrap',
        'uiSwitch',
        'ui.router',
        'nemLogging',
        'ui-leaflet',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'restangular',
        'yaru22.md',
        'monospaced.elastic',
        'ui.calendar',
        require('./constants').name,
        require('./directives').name,
        require('./services').name
    ]);

