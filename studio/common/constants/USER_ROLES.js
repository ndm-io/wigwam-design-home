'use strict';

var CONSTANTS = (function () {
    return {
        anon: 0,
        guest: 1,
        editor: 2,
        admin: 3
    };
}());

CONSTANTS.$inject = [];
module.exports = CONSTANTS;