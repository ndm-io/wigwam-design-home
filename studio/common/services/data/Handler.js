'use strict';

var _ = require('lodash');

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

    return {
        handleUpdate: handleUpdate,
        handle: handle
    };
};

module.exports = Handler;