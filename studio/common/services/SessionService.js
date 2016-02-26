'use strict';

var SessionService = function () {
    this.create = function (user) {
        this.user = user;
        this.userId = user._id;
        this.userRole = user.role;
    };
    this.destroy = function () {
        this.user = null;
        this.userId = null;
        this.userRole = null;
    };
    return this;
};

module.exports = SessionService;

