'use strict';

var User = require('../models/User');
var Promise = require('promise');
var _ = require('lodash');

var SessionService = function () {

    var _promises = [];

    var doPromises = function (user) {
        _.each(_promises, function (resolve) {
            resolve(user);
        });
        _promises.length = 0;
    };

    this.create = function (user) {
        this.user = new User(user);
        this.userId = user._id;
        this.userRole = user.role;
        var that = this;

        doPromises(that.user);

        return this;
    };
    this.destroy = function () {
        this.user = null;
        this.userId = null;
        this.userRole = null;
    };


    this.onReady = function () {

        if (this.user) {
            return Promise.resolve(this.user);
        }

        return new Promise(function (resolve, reject) {
            _promises.push(resolve);
        });
    };

    return this;
};

module.exports = SessionService;

