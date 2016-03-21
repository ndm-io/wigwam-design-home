'use strict';

var User = require('../models/User');
var _ = require('lodash');

var SessionService = function () {

    var _fns = [];

    this.create = function (user) {
        this.user = new User(user);
        this.userId = user._id;
        this.userRole = user.role;
        var that = this;

        _.each(_fns, function (resolve) {
           resolve(that.user);
        });

        return this;
    };
    this.destroy = function () {
        this.user = null;
        this.userId = null;
        this.userRole = null;
    };


    this.onReady = function (fn) {
        if (fn) {
            _fns.push(fn)
        } else {
            return new Promise(function (resolve, reject) {
                _fns.push(resolve);
            });
        }
    };

    return this;
};

module.exports = SessionService;

