'use strict';

var icheck = require('icheck'),
    status = require('../../../server/config/statuses'),
    $ = require('jquery');

function icheckInput(DataFactory, SessionService) {

    var link = function (scope, el, attrs) {

        $(el)
            .iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            })
            .on('ifChecked', function () {
                DataFactory.chatStatus(SessionService.user, status[attrs.value]);
            });

    };

    return {
        link: link,
        controller: 'ChatStatusWidgetCtrl',
        controllerAs: 'chatStatusWidgetCtrl'
    };
}

icheckInput.$inject = ['DataFactory', 'SessionService'];
module.exports = icheckInput;