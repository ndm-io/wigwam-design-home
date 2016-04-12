'use strict';

var _ = require('lodash'),
    types = require('../../../../../server/config/IOTypes'),
    User = require('../../../../common/models/User');

function designersHandler(SocketFactory, cache) {
    SocketFactory.on(types.designersAvailable, function (data) {
        cache.designers = _.map(data, function (json) {
            return new User(json);
        });
    });
}

module.exports = designersHandler;