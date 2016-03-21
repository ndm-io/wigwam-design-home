'use strict';


var IOFactory = function (SessionService) {

    var _io = undefined;

    SessionService.onReady()
        .then(function () {
            _io = SessionService.io;
        })

    return {
        data:function () {
            return 'done'
        }
    };
};

IOFactory.$inject = ['SessionService'];
module.exports = IOFactory;