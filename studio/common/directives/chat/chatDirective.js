'use strict';

function chatDirective() {
    return {
        controller: 'ChatCtrl',
        controllerAs:'chatCtrl',
        template: require('./chat.html'),
        scope: {
            chatModel: '='
        }
    };
}

module.exports = chatDirective;