'use strict';

var User = require('../models/User');

var SessionService = function () {
    this.create = function (user) {
        this.user = new User(user);
        this.userId = user._id;
        this.userRole = user.role;
        return this;
    };
    this.destroy = function () {
        this.user = null;
        this.userId = null;
        this.userRole = null;
    };
    return this;
};

module.exports = SessionService;

