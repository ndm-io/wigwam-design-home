'use strict';

var AuthStages = require('./AuthenticationStages'),
    User = require('../../../models/User');

function Authenticate (io, socket) {

    return function (data) {

        User.user(data)
            .then(AuthStages.goOnline(socket))
            .then(AuthStages.updateSocket(io, socket))
            .then(AuthStages.sendUpdates(io, socket))
            .catch(function (err) {
                console.log('Authenticate error', err);
            });

    };
}

module.exports = Authenticate;