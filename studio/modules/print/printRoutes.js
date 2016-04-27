'use strict';

var s = require('./states.js'),
    _ = require('lodash');

function homeRoutes($stateProvider) {

    _.values(s)
        .forEach(function (state) {
            $stateProvider.state(state);
        });

}

homeRoutes.$inject = ['$stateProvider'];
module.exports = homeRoutes;