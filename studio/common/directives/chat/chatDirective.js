'use strict';

var $ = require('jquery');

function chatDirective() {

    var animate = function (jqEl) {
        jqEl.stop().animate({
            scrollTop: jqEl[0].scrollHeight
        }, 800);
    };

    var link = function (scope, el) {

        var j = $(el).find('.quick-chat-message-container');
        scope.animateContainer = function () {
            if (j) animate(j);
        };
    };

    return {
        link: link,
        controller: 'ChatCtrl',
        controllerAs: 'chatCtrl',
        template: require('./chat.html'),
        scope: {
            chatModel: '='
        }
    };
}

module.exports = chatDirective;