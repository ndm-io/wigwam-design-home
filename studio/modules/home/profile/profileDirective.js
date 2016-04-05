'use strict';

var $ = require('jquery');

module.exports = function profileDirective() {

    var MIN_HEIGHT = 220;

    function round(numToRound) {
        var numToRoundTo = 1 / (100);
        return Math.round(numToRound * numToRoundTo) / numToRoundTo;
    }

    var sizer = function (el) {
        var e = $(el);
        var height = round(e.height());
        return {
            width: round(e.width()),
            height: (height > 0) ? height : MIN_HEIGHT
        };

    };

    var link = function (scope, el) {
        var size = sizer(el);
        scope.MIN_HEIGHT = MIN_HEIGHT;
        scope.backgroundUrl = ['https://source.unsplash.com/featured/',size.width,'x',MIN_HEIGHT,'/?nature'].join('');
    };

    return {
        link: link,
        controller: 'ProfileCtrl',
        controllerAs: 'profileCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./profile.html')
    }
};