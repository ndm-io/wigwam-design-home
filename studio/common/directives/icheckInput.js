'use strict';

var icheck = require('icheck'),
    $ = require('jquery');

function icheckInput(DataFactory) {

    var link = function (scope, el, attrs) {

        $(el)
            .iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            })
            .on('ifChecked', function () {
                DataFactory.chatStatus(attrs.value);
            });

    };

    return {
        link: link,
        controller: 'ChatStatusWidgetCtrl',
        controllerAs: 'chatStatusWidgetCtrl'
    };
}

icheckInput.$inject = ['DataFactory'];
module.exports = icheckInput;