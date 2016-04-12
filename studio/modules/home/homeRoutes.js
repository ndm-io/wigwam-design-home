'use strict';


var s = require('./states.js'),
    _ = require('lodash');

function homeRoutes($stateProvider) {

    var states = _.values(s);

    _.each(states, function (state) {
        $stateProvider.state(state);
    });
}

homeRoutes.$inject = ['$stateProvider'];
module.exports = homeRoutes;
