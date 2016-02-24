'use strict';

module.exports = angular.module('modules.pages', [
        require('./about').name,
        require('./wigwam').name
    ])
    .config(require('./pagesRoutes'))
    .controller('PagesCtrl', require('./PagesController'));