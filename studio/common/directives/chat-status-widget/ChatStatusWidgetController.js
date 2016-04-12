'use strict';

var STATUS = require('../../../../server/config/statuses');

var ChatStatusWidgetCtrl = function ($scope, DataFactory, SessionService) {

    var enabled = false;

    $scope.__defineGetter__('title', function () {
        return ($scope.enabled) ? 'CHAT ON' : 'CHAT OFF';
    });

    $scope.__defineSetter__('enabled', function (value) {
        var status = (value) ? STATUS.online : STATUS.offline;
        DataFactory.chat.chatStatus(SessionService.user, status);
        enabled = value;
    });

    $scope.__defineGetter__('enabled', function () {
        return enabled;
    });
};

ChatStatusWidgetCtrl.$inject = ['$scope', 'DataFactory', 'SessionService'];
module.exports = ChatStatusWidgetCtrl;