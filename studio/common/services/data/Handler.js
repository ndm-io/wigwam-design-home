'use strict';

var _ = require('lodash'),
    status = require('../../../../server/config/statuses');

var Handler = function (SocketFactory, cache) {

    var handleUpdate = function (event, opts) {

        var cacheProp = opts.prop,
            Model = opts.model,
            clobber = opts.clobber || false;

        SocketFactory.on(event, function (data) {

            if (!_.isArray(data)) {
                data = [data];
            }

            var objects = _.map(data, function (json) {
                var model = new Model();
                model.initFromJson(json);
                return model;
            });

            if (clobber) {
                cache[cacheProp].length = 0;
            }
            cache[cacheProp] = _.union(cache[cacheProp], objects);
        });
    };

    var handle = function (event, fn) {
        SocketFactory.on(event, fn);
    };

    var handleStatus = function (data) {
        switch (data.status) {
            case status.online: {

                break;
            }
            case status.offline: {
                cache.removeUserFromChats(data.user);
                break;
            }
            case status.busy: {
                cache.removeUserFromChats(data.user);
                break;
            }
        }
    };

    return {
        handleUpdate: handleUpdate,
        handle: handle,
        handleStatus: handleStatus
    };
};

module.exports = Handler;