'use strict';

var $ = require('jquery'),
    Chat = require('../../../common/models/Chat');

var SidebarCtrl = function ($scope, $rootScope, SessionService, DataFactory) {

    // Side bar

    var vm = $scope,
        _profileOpen = false;

    vm.ss = SessionService;

    vm.gravatar = vm.ss.user.gravatar();

    vm.profileOpen = function () {
        return (_profileOpen) ? 'open' : '';
    };

    vm.toggleProfileOpen = function () {
        _profileOpen = !_profileOpen;
    };

    vm.designers = function () {
        return DataFactory.chat.designers();
    };

    vm.requestChat = function (designer) {
        var chat = new Chat({
            occupants: [designer, SessionService.user],
            instigator: SessionService.user
        });

        DataFactory.chat.instigateChat(chat);
    };

    vm.projectsCount = function () {
        return DataFactory.project.projects().length;
    };

    //$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
    //});
};

SidebarCtrl.$inject = ['$scope', '$rootScope', 'SessionService', 'DataFactory'];
module.exports = SidebarCtrl;