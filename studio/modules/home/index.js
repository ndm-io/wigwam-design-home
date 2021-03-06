'use strict';
// Home View
module.exports = angular.module('modules.home', [
        require('./header').name,
        require('./sidebar').name,
        require('./projects').name,
        require('./project').name,
        require('./users').name,
        require('./terms').name,
        require('./messages').name,
        require('./message').name,
        require('./profile').name,
        require('./dash').name,
        require('./calendar').name,
        require('./breadcrumb').name
    ])
    .directive('homeView', require('./homeDirective'))
    .controller('HomeCtrl', require('./HomeController'))
    .config(require('./homeRoutes'));