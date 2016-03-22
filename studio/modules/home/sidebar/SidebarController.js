'use strict';

var Chat = require('../../../common/models/Chat');

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
        return DataFactory.designers();
    };

    vm.requestChat = function (designer) {
        var data = {
            occupants: [designer, SessionService.user],
            instigator: SessionService.user
        };

        console.log(data);

        var chat = new Chat(data);

        DataFactory.instigateChat(chat);
    };

    // Route Changes

    //$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
    //    console.log(toState);
    //});
};

SidebarCtrl.$inject = ['$scope', '$rootScope', 'SessionService', 'DataFactory'];
module.exports = SidebarCtrl;